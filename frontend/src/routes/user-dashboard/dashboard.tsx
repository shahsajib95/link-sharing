import { Card } from "@/components/ui/card";

import Linkform from "./components/Linkform";

export default function UserDashboard() {
  return (
    <Card className="col-span-4 border-none p-5 shadow-none">
      <h2 className="font-bold text-gray-800">Customize your links</h2>
      <small className="text-gray-400">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </small>
      <Linkform />
    </Card>
  );
}
