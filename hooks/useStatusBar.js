import { useEffect } from 'react';
import { StatusBar } from 'react-native';

export function useStatusBar({
  backgroundColor = 'transparent',
  barStyle = 'default',
  hidden = false,
}) {
  useEffect(() => {
    StatusBar.setBarStyle(barStyle);
    StatusBar.setBackgroundColor(backgroundColor);
    StatusBar.setHidden(hidden);
  }, [backgroundColor, barStyle, hidden]);
}
