import React from "react";
import { loadCloudProviderActions } from "./actions/cloudProviderActions";
import CloudProvider from "./pages/cloud-provider/cloud-provider";
import { Store } from "redux";

interface Props {
  store: Store;
}

function App(props: Props) {
  const { store } = props;
  React.useEffect(() => {
    loadCloudProviderActions();
  }, []);
  return (
    <div className="App">
      <CloudProvider store={store} />
    </div>
  );
}

export default App;
