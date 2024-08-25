interface Props {
  message: string;
}

export default function Error({ message }: Props) {
  return (
    <div className="text-destructive flex h-screen w-full items-center justify-center">
      {message}
    </div>
  );
}
