import './Logo.scss';

type Props = {
  color?: 'light';
};

export const Logo: React.FC<Props> = ({ color }) => {
  return (
    <a href="/" className="logo">
      <div className={`logo__content logo__content--${color}`}>
        ArtGalleryManager
      </div>
    </a>
  );
};
