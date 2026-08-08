import { For, onMount } from "solid-js";

import { allHosts, showDetails } from "../functions/exports";

import TableRow from "../components/Body/TableRow";
import TableHead from "../components/Body/TableHead";
import CardHead from "../components/Body/CardHead";
import { getHosts } from "../functions/atstart";

function Body() {

  onMount(() => {
    getHosts();
  });

  return (
    <div class="card border-primary mn-panel">
      <div class="card-header">
        <CardHead></CardHead>
      </div>
      <div class="card-body table-responsive">
        <table class={showDetails() ? "table table-striped table-hover mn-table mn-show-details" : "table table-striped table-hover mn-table"}>
          <TableHead></TableHead>
          <tbody>
            <For each={allHosts}>{(host, index) =>
            <TableRow host={host} index={index() + 1}></TableRow>
            }</For>
          </tbody> 
        </table>
      </div>
    </div>
  )
}

export default Body
