import { ReloadIcon } from "@radix-ui/react-icons";

export default function Loader() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <ReloadIcon className="animate-spin" />
    </div>
  );
}
