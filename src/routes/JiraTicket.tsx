import { useForm } from "react-hook-form";
import { useLocalStorage } from "./useLocalStorage";

type JiraTicket = {
  title: string;
  description: string;
  clientDetails: {
    clientName: string;
    clientId: string;
  };
  testingEvnironments: [];
};

export default function JiraTicket() {
  const defaultValues: JiraTicket = {
    title: "",
    description: "",
    clientDetails: {
      clientName: "",
      clientId: "",
    },
    testingEvnironments: [],
  };

  const [jiraTicket, setJiraTicket, removeJiraTicket] = useLocalStorage(
    "jiraTicket",
    defaultValues,
  );

  const { register, reset, getValues } = useForm<JiraTicket>({
    defaultValues: defaultValues,
    values: jiraTicket,
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
            Ticket Title:
            <input {...register("title")} type="text" />
          </label>

          <label>
            Client Name:
            <input {...register("clientDetails.clientName")} type="text" />
          </label>

          <label>
            Client Id:
            <input {...register("clientDetails.clientId")} type="text" />
          </label>

          <label>
            Ticket Description:
            <input {...register("description")} type="text" />
          </label>

          <div>Where did you test? </div>
          <label>
            <input
              {...register("testingEvnironments")}
              type="checkbox"
              value="UAT"
            />
            UAT
          </label>

          <label>
            <input
              {...register("testingEvnironments")}
              type="checkbox"
              value="Inttest"
            />
            Inttest
          </label>

          <label>
            <input
              {...register("testingEvnironments")}
              type="checkbox"
              value="UATCJE"
            />
            UAT CJE
          </label>

          <label>
            <input
              {...register("testingEvnironments")}
              type="checkbox"
              value="QA10"
            />
            QA10
          </label>
        </form>
        <button onClick={handleReset}>Reset Ticket</button>
        <button onClick={handleSave}>Save Ticket</button>
      </div>
    </>
  );
}
