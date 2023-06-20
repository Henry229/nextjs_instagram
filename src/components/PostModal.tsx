import CloseIcon from './ui/icons/CloseIcon';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function PostModal({ onClose, children }: Props) {
  return (
    <section
      className='fixed top-0 left-0 z-50 flex-col w-full h-full bg-black bg-neutral-900/70'
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        className='fixed top-0 right-0 p-8 text-white'
        onClick={() => onClose()}
      >
        <CloseIcon />
      </button>
      {children}
    </section>
  );
}
