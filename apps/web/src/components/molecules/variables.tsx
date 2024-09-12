import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface Variable {
  code: string;
  description: string;
}

interface Props {
  data: Variable[];
}

export default function Variables({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Variables</CardTitle>
        <CardDescription>
          You can use these variables in the message.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map(({ code, description }, index) => (
          <div key={`variable-${index.toString()}`} className="flex">
            <div className="min-w-28 text-blue-400">{code}</div>
            <div className="text-muted-foreground">{description}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
