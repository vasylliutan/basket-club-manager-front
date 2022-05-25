import React from "react";
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from "react-crud-table";
import * as _ from "lodash";

// Component's Base CSS
import "./index.css";
import Loader from "./Loader";
import {
  getAgentList,
  createAgent,
  deleteAgent,
  updateAgent,
} from "./services/agent.servise";
import { styles } from "./shared";

const validation = (values) => {
  const errors = {};
  if (!values.agentName) {
    errors.agentName = "Please, provide agent's name";
  }
  if (!values.agentAddress) {
    errors.agentAddress = "Please, provide agent's Address";
  }
  if (!values.email) {
    errors.email = "Please, provide agent's email";
  }
  if (!values.phone) {
    errors.phone = "Please, provide agent's phone";
  }
  console.info("Errors validation", errors);
  return errors;
};
const Agents = () => {
  const [loading, setLoading] = React.useState(true);

  const fetchLeaguesAndCities = async () => {
    setLoading(true);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchLeaguesAndCities();
  }, []);

  const service = {
    fetchItems: (payload) => {
      return Promise.resolve(getAgentList());
    },
    create: (data) => {
      return Promise.resolve(createAgent(data));
    },
    update: (data) => {
      const id = data.agentId;
      return Promise.resolve(
        updateAgent(
          _.pick(data, ["agentName", "agentAddress", "email", "phone"]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteAgent(data.agentId));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="Agents"
        fetchItems={(payload) => service.fetchItems(payload)}
        // items={clubs}
      >
        <Fields>
          <Field name="agentName" label="agentName" placeholder="agentName" />
          <Field
            name="agentAddress"
            label="agentAddress"
            placeholder="agentAddress"
          />
          <Field name="email" label="email" placeholder="email" />
          <Field name="phone" label="phone" placeholder="phone" />
        </Fields>
        <CreateForm
          title="Agent Creation"
          message="Create a new Agent!"
          trigger="Create Agent"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="Agent Update Process"
          message="Update Agent"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="Agent Delete Process"
          message="Are you sure you want to delete the Agent?"
          trigger="Delete"
          onSubmit={(task) => service.delete(task)}
          submitText="Delete"
          validate={(values) => {
            return {};
          }}
        />
      </CRUDTable>
    </div>
  );
};

export default Agents;
