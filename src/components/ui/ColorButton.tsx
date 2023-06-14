type Props = {
  text: string;
  onClick: () => void;
};

export default function ColorButton({ text, onClick }: Props) {
  return (
    <div className='rounded-md bg-gradient-to-bl from-fuchsia-600 via-ose-500 to-amber-300 p-[0.15rem]'>
      <button
        className='text-base bg-white rounded-sm p-[0.3rem] hover:opacity-90 transition-opacity'
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}
