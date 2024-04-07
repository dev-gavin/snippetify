import { useForm } from "react-hook-form";
import { useLocalStorage } from "./useLocalStorage";

type JiraTicket = {
  description: string;
  clientDetails: {
    clientName: string;
    clientId: number | undefined;
  };
};

export default function JiraTicket() {
  let defaultValues: JiraTicket = {
    description: "",
    clientDetails: {
      clientName: "",
      clientId: undefined,
    },
  };

  const [jiraTicket, setJiraTicket, removeJiraTicket] = useLocalStorage(
    "jiraTicket",
    defaultValues,
  );

  const { register, reset, getValues } = useForm<JiraTicket>({
    defaultValues: jiraTicket,
  });

  function handleSave() {
    const formValues = getValues();
    setJiraTicket(formValues);
  }

  function handleReset() {
    removeJiraTicket();
    reset();
  }

  return (
    <>
      <div>
        <form>
          <label>
            Client Name
            <input type="text" {...register("clientDetails.clientName")} />
          </label>
          <label>
            Client Id
            <input type="number" {...register("clientDetails.clientId")} />
          </label>{" "}
          <label>
            Ticket Description
            <input type="text" {...register("description")} />
          </label>
          <div>Where did you test? </div>
          <label>
            <input type="checkbox" value="UAT" />
            UAT
          </label>
          <label>
            <input type="checkbox" value="UAT" />
            Inttest
          </label>
          <label>
            <input type="checkbox" value="UAT" />
            UAT CJE
          </label>
          <label>
            <input type="checkbox" value="UAT" />
            QA10
          </label>
        </form>
        <button onClick={handleReset}>Reset Ticket</button>
        <button onClick={handleSave}>Save Ticket</button>
      </div>
    </>
  );
}
