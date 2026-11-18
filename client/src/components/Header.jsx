
export default function Header({ onHome }) {
    return (
        <header className="site-header">
            <div className="header-inner">

                <button
                    className="brand"
                    onClick={onHome}
                    aria-label="На головну сторінку"
                >
                    <span className="brand-mark">S</span>
                    <span>StudyLite</span>
                </button>

                <span className="header-caption">
                    Платформа дистанційного навчання
                </span>

            </div>
        </header>
    );
}
