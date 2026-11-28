import { GradientButton } from '@/components/ui/GradientButton';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useAuth } from '@/providers/AuthProvider';
import { savePersonalFoundation } from '@/services/profile/profile.service';
import { useTheme } from '@/theme/ThemeProvider';

type Gender =
  | 'Male'
  | 'Female'
  | 'Non-binary'
  | 'Other'
  | 'Prefer not to say';

type WeightUnit = 'kg' | 'lb';
type HeightUnit = 'cm' | 'ft';

export function PersonalFoundationForm() {
  const { colors, spacing, radius, typography } = useTheme();
  const { user } = useAuth();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<Gender | null>(null);

  const [height, setHeight] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [heightUnit, setHeightUnit] = useState<HeightUnit>('cm');

  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState<WeightUnit>('kg');

  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const genderOptions: Gender[] = [
    'Male',
    'Female',
    'Non-binary',
    'Other',
    'Prefer not to say',
  ];

  const changeHeightUnit = (unit: HeightUnit) => {
    if (unit === heightUnit) return;

    if (height && heightUnit === 'cm' && unit === 'ft') {
      const totalInches = Number(height) / 2.54;
      setHeight(String(Math.floor(totalInches / 12)));
      setHeightInches(
        String(Math.round((totalInches % 12) * 10) / 10),
      );
    } else if (height && heightUnit === 'ft' && unit === 'cm') {
      const totalInches =
        Number(height) * 12 + Number(heightInches || 0);

      setHeight(String(Math.round(totalInches * 2.54)));
      setHeightInches('');
    }

    setHeightUnit(unit);
  };

  const changeWeightUnit = (unit: WeightUnit) => {
    if (unit === weightUnit) return;

    if (weight) {
      const converted =
        weightUnit === 'kg'
          ? Number(weight) * 2.20462
          : Number(weight) / 2.20462;

      setWeight(String(Math.round(converted * 10) / 10));
    }

    setWeightUnit(unit);
  };

  const inputStyle = {
    backgroundColor: colors.surfaceSecondary,
    color: colors.text,
    borderColor: colors.border,
  };

  const handleContinue = async () => {
    if (isSaving) return;

    setError('');

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError('Please enter your preferred name.');
      return;
    }

    const parsedAge = Number(age);

    if (
      !age ||
      !Number.isInteger(parsedAge) ||
      parsedAge < 13 ||
      parsedAge > 120
    ) {
      setError('Please enter a valid age between 13 and 120.');
      return;
    }

    const parsedWeight = Number(weight);

    if (
      !weight ||
      !Number.isFinite(parsedWeight) ||
      parsedWeight <= 0
    ) {
      setError('Please enter a valid weight.');
      return;
    }

    const weightKg =
      weightUnit === 'kg'
        ? parsedWeight
        : parsedWeight / 2.20462;

    if (weightKg < 20 || weightKg > 500) {
      setError('Please enter a weight within a valid range.');
      return;
    }

    let heightCm: number | null = null;

    if (height) {
      if (heightUnit === 'cm') {
        const parsedHeight = Number(height);

        if (
          !Number.isFinite(parsedHeight) ||
          parsedHeight < 50 ||
          parsedHeight > 300
        ) {
          setError('Please enter a valid height in centimetres.');
          return;
        }

        heightCm = parsedHeight;
      } else {
        const feet = Number(height);
        const inches = Number(heightInches || 0);

        if (
          !Number.isFinite(feet) ||
          !Number.isFinite(inches) ||
          feet < 1 ||
          feet > 8 ||
          inches < 0 ||
          inches > 11
        ) {
          setError('Please enter a valid height in feet and inches.');
          return;
        }

        heightCm = Math.round((feet * 12 + inches) * 2.54);
      }
    }

    if (!user) {
      setError('Your session has expired. Please sign in again.');
      return;
    }

    const profileData = {
      preferred_name: trimmedName,
      age: parsedAge,
      gender,
      height_cm: heightCm,
      weight_kg: Math.round(weightKg * 10) / 10,
      completed_stage: 1,
    };

    setIsSaving(true);

    try {
      await savePersonalFoundation(user.id, profileData);

      Alert.alert(
        'Profile saved!',
        'Your personal foundation has been saved successfully.',
      );
    } catch (saveError) {
      console.error('Profile save error:', saveError);

      setError(
        'We could not save your profile. Please check your connection and try again.',
      );
    } finally {
      setIsSaving(false);
    }
  };

  const renderUnitButton = <T extends string>(
    label: T,
    selected: T,
    onSelect: (value: T) => void,
  ) => (
    <Pressable
      key={label}
      onPress={() => onSelect(label)}
      style={[
        styles.unitButton,
        {
          backgroundColor:
            selected === label ? colors.primary : colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      <Text
        style={{
          color: selected === label ? colors.textOnPrimary : colors.text,
          fontWeight: '600',
        }}
      >
        {label}
      </Text>
    </Pressable>
  );

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <Text
        style={[
          styles.title,
          { color: colors.text, fontSize: typography.fontSize?.['3xl'] ?? 30 },
        ]}
      >
        Let's get to know you
      </Text>

      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        We'll use these details to establish your personal foundation.
        You can update them later.
      </Text>

      {/* Preferred name */}
      <Text style={[styles.label, { color: colors.text }]}>
        What should we call you? *
      </Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Preferred name"
        placeholderTextColor={colors.textMuted}
        style={[styles.input, inputStyle]}
      />

      {/* Age */}
      <Text style={[styles.label, { color: colors.text }]}>
        Age *
      </Text>

      <TextInput
        value={age}
        onChangeText={setAge}
        placeholder="Your age"
        placeholderTextColor={colors.textMuted}
        keyboardType="numeric"
        style={[styles.input, inputStyle]}
      />

      {/* Gender */}
      <Text style={[styles.label, { color: colors.text }]}>
        Gender
      </Text>

      <View style={styles.optionsContainer}>
        {genderOptions.map((option) => (
          <Pressable
            key={option}
            onPress={() =>
              setGender(gender === option ? null : option)
            }
            style={[
              styles.genderButton,
              {
                backgroundColor:
                  gender === option ? colors.primary : colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={{
                color:
                  gender === option ? colors.textOnPrimary : colors.text,
              }}
            >
              {option}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Height */}
      <Text style={[styles.label, { color: colors.text }]}>
        Height
      </Text>

      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <TextInput
            value={height}
            onChangeText={setHeight}
            placeholder={heightUnit === 'cm' ? 'Height in cm' : 'Feet'}
            placeholderTextColor={colors.textMuted}
            keyboardType="numeric"
            style={[styles.input, inputStyle]}
          />
        </View>

        {heightUnit === 'ft' && (
          <View style={{ flex: 1 }}>
            <TextInput
              value={heightInches}
              onChangeText={setHeightInches}
              placeholder="Inches"
              placeholderTextColor={colors.textMuted}
              keyboardType="numeric"
              style={[styles.input, inputStyle]}
            />
          </View>
        )}
      </View>

      <View style={styles.unitRow}>
        {renderUnitButton('cm', heightUnit, changeHeightUnit)}
        {renderUnitButton('ft', heightUnit, changeHeightUnit)}
      </View>

      {/* Weight */}
      <Text style={[styles.label, { color: colors.text }]}>
        Weight *
      </Text>

      <TextInput
        value={weight}
        onChangeText={setWeight}
        placeholder={`Weight in ${weightUnit}`}
        placeholderTextColor={colors.textMuted}
        keyboardType="decimal-pad"
        style={[styles.input, inputStyle]}
      />

      <View style={styles.unitRow}>
        {renderUnitButton('kg', weightUnit, changeWeightUnit)}
        {renderUnitButton('lb', weightUnit, changeWeightUnit)}
      </View>

      <Text style={[styles.helperText, { color: colors.textMuted }]}>
        Your weight is required for establishing certain physical
        baselines. It isn't a judgment of your progress or worth.
      </Text>

      {/* Validation error */}
      {error !== '' && (
        <Text style={[styles.error, { color: colors.error }]}>
          {error}
        </Text>
      )}

      
      {/* Continue */}
      <GradientButton
        title="Continue"
        onPress={handleContinue}
        loading={isSaving}
        style={{ marginTop: spacing.lg }}
      />


      <Text style={[styles.footer, { color: colors.textMuted }]}>
        Stage 1 of your personal foundation
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 48,
  },
  title: {
    fontWeight: '700',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 28,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 18,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genderButton: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  unitRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  unitButton: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  helperText: {
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
  },
  error: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 13,
  },
});