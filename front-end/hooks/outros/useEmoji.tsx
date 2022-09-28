import { useEffect, useState } from 'react';
import emojiAleatorio from '../../utils/outros/emojiAleatorio';

export default function useEmoji() {

    const [emoji, setEmoji] = useState<string>('');
    useEffect(() => {
       setEmoji(emojiAleatorio());
    }, []);

    return emoji;
}