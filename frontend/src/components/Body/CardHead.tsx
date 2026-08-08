import { Show } from "solid-js";
import { editNames, selectedIDs, setEditNames, setShowDetails, showDetails } from "../../functions/exports";
import Filter from "../Filter";
import Search from "../Search";
import { getHosts } from "../../functions/atstart";
import { apiDelHost } from "../../functions/api";
import { Button } from "../ui/button";
import { Toggle } from "../ui/toggle";

function CardHead() {

  const handleEditNames = (toggle: boolean) => {
    if (!toggle) {
      getHosts();
    }
    setEditNames(toggle);
  };

  const handleDel = async () => {
    const ids = selectedIDs();
    
    for (let id of ids) {
      await apiDelHost(id);
    }
    
    window.location.href = '/';
  };

  const handleDetails = () => {
    setShowDetails(!showDetails());
  };

  return (
    <div class="row g-2 align-items-center mn-toolbar">
      <div class="col-md mt-1 mb-1">
        <div class="d-flex justify-left">
        <Filter></Filter>
        </div>
      </div>
      <div class="col-md mt-1 mb-1">
        <div class="d-flex justify-content-between gap-2">
        <Search></Search>
        <Toggle
          pressed={showDetails()}
          onChange={handleDetails}
          variant={showDetails() ? "default" : "outline"}
          size="sm"
          class="mn-detail-toggle"
          title="Toggle details"
        >
          Details
        </Toggle>
        <Show
          when={editNames()}
          fallback={<Button variant="outline" size="sm" title="Toggle edit" onClick={[handleEditNames, true]}>Edit</Button>}
        >
          <Button type="button" onClick={handleDel} title="Delete selected hosts" variant="destructive" size="sm">Delete</Button>
          <Button variant="default" size="sm" title="Toggle edit" onClick={[handleEditNames, false]}>Done</Button>
        </Show>
        </div>
      </div>
    </div>
  )
}

export default CardHead
