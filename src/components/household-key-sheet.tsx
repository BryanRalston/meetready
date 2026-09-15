import { useState } from "react";
import { Button, Field, Sheet } from "@/components/ui";
import { householdKeyMatches } from "@/lib/household-key";

export function HouseholdKeySheet({
  onClose,
  onUnlock,
}: {
  onClose: () => void;
  onUnlock: () => void;
}) {
  const [value, setValue] = useState("");
  const [wrong, setWrong] = useState(false);

  function submit() {
    if (!householdKeyMatches(value)) {
      setWrong(true);
      return;
    }
    onUnlock();
  }

  return (
    <Sheet onClose={onClose}>
      <p className="text-kicker uppercase tracking-kicker text-subtle">Household</p>
      <h2 className="mt-2 font-display text-2xl font-medium tracking-title">If you have a key</h2>
      <p className="mt-3 text-ui leading-relaxed text-muted">Not an offer. Not a trial. Type it.</p>
      <form
        className="mt-4"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <Field
          label="Key"
          value={value}
          onChange={(v) => {
            setValue(v);
            setWrong(false);
          }}
        />
        {wrong && <p className="mt-2 text-meta text-danger">Nope.</p>}
        <Button className="mt-5 w-full" type="submit" disabled={!value.trim()}>
          Enter
        </Button>
      </form>
      <Button variant="ghost" className="mt-2 w-full" onClick={onClose}>
        Never mind
      </Button>
    </Sheet>
  );
}
