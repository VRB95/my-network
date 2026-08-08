import { Show } from "solid-js";
import { editNames, selectedIDs, setEditNames, setShowDetails, showDetails } from "../../functions/exports";
import Filter from "../Filter";
import Search from "../Search";
import { getHosts } from "../../functions/atstart";
import { apiDelHost } from "../../functions/api";

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
        <button
          class={showDetails() ? "btn btn-sm btn-primary mn-detail-toggle" : "btn btn-sm btn-outline-primary mn-detail-toggle"}
          title="Toggle details"
          onClick={handleDetails}
        >
          Details
        </button>
        <Show
          when={editNames()}
          fallback={<button class="btn btn-sm btn-outline-primary" title="Toggle edit" onClick={[handleEditNames, true]}>Edit</button>}
        >
          <button type="button" onClick={handleDel} title="Delete selected hosts" class="btn btn-sm btn-outline-danger">Delete</button>
          <button class="btn btn-sm btn-primary" title="Toggle edit" onClick={[handleEditNames, false]}>Done</button>
        </Show>
        </div>
      </div>
    </div>
  )
}

export default CardHead
