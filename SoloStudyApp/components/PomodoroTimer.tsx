import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Vibration, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState<number>(25); // valor do slider
  const [secondsLeft, setSecondsLeft] = useState<number>(25 * 60); // tempo restante em segundos
  const [running, setRunning] = useState<boolean>(false); // se está contando ou não
  const interval = useRef<ReturnType<typeof setInterval> | null>(null); // referência do setInterval

  // Atualiza segundos toda vez que os minutos mudam (via slider)
  useEffect(() => {
    if (!running) {
      setSecondsLeft(minutes * 60);
    }
  }, [minutes]);

  // Controla o timer quando está rodando
  useEffect(() => {
    if (running) {
      interval.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval.current!);
            Vibration.vibrate(); // vibra ao terminar
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval.current!);
    }

    return () => clearInterval(interval.current!); // limpa o timer ao desmontar
  }, [running]);

  // Converte segundos para formato MM:SS
  const formatTime = (sec: number): string => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(secondsLeft)}</Text>

      <Slider
        minimumValue={5}
        maximumValue={60}
        step={1}
        value={minutes}
        onValueChange={setMinutes}
        disabled={running}
        style={{ width: 200, marginVertical: 20 }}
      />
      <Text style={styles.minutesLabel}>{minutes} minutos</Text>

      <Button
        title={running ? 'Pausar' : 'Iniciar'}
        onPress={() => setRunning(!running)}
      />

      <Button
        title="Resetar"
        onPress={() => {
          setRunning(false);
          setSecondsLeft(minutes * 60);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 50,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  minutesLabel: {
    fontSize: 16,
    marginBottom: 20,
  },
});
