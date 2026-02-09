import { Play } from "lucide-react";
import styles from "./MediaPlayer.module.css";

export default function MediaPlayer() {
    return (
        <div className={styles.wrapper}>
            {/* Placeholder for actual video implementation */}
            <div className={styles.video} style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2670&auto=format&fit=crop")' }}>
                <div className={styles.overlay}>
                    <div className={styles.playBtn}>
                        <Play size={40} fill="#fff" stroke="none" style={{ marginLeft: '4px' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
