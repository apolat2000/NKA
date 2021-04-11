<template>
  <i-datatable :columns="columns" :rows="rows">
    <template v-slot:expand="{ row, columns }">
      <td :colspan="columns.length">here be desc {{ row.title }}</td>
    </template>
  </i-datatable>

  <!-- <div
    class="select-none block self-center w-2/3 sm:w-4/5 md:w-3/4 lg:w-2/3 mx-auto mb-8"
  >
    <t-table
      :headers="headers"
      :data="rows"
      :responsive="true"
      :responsive-breakpoint="100"
    >

      <template slot="row" slot-scope="{ trClass, tdClass, rowIndex, row, renderResponsive }">
        <tr
          :class="[
            trClass,
            rowIndex % 2 === 0 ? 'bg-gray-200' : '',
          ]"
        >
          <td
            v-if="renderResponsive"
            :class="tdClass"
            @mouseover="
              rows[rowIndex].hoverLec = true;
              getDesc('lecture', rowIndex);
            "
            @mouseleave="rows[rowIndex].hoverLec = false"
          >
            {{ abbr(row.lecture) }}
            <tooltip
              :corpus="rows[rowIndex].lectureDesc"
              :hover="rows[rowIndex].hoverLec"
            />
          </td>
          <td
            v-if="!renderResponsive"
            :class="tdClass"
            @mouseover="
              rows[rowIndex].hoverLec = true;
              getDesc('lecture', rowIndex);
            "
            @mouseleave="rows[rowIndex].hoverLec = false"
          >
            {{ row.lecture }}
            <tooltip
              :corpus="rows[rowIndex].lectureDesc"
              :hover="rows[rowIndex].hoverLec"
            />
          </td>
          <td
            :class="tdClass"
            @mouseover="rows[rowIndex].hoverTit = true"
            @mouseleave="rows[rowIndex].hoverTit = false"
          >
            {{ row.title }}
            <tooltip
              :corpus="tutorials[rowIndex].description"
              :hover="rows[rowIndex].hoverTit"
            />
          </td>
          <td :class="tdClass">
            {{ row.scheduling }}
          </td>
          <td :class="tdClass">
            {{ row.tutor }}
          </td>
          <td :class="tdClass">
            <t-button
              @click="
                $router.push(
                  '/tutorials/' + rows[rowIndex].id + '/summary'
                )
              "
              :variant="
                rows[rowIndex].isActive
                  ? 'activeCircle'
                  : 'inactiveCircle'
              "
              >➤</t-button
            >
          </td>
        </tr>
      </template>
    </t-table>
  </div> -->
</template>


<script>
import axios from "axios";
import IsActive from "./IsActive";
import LecHover from "./LecHover";
import TutorPp from "./TutorPp";
//import Tooltip from '../common/Tooltip.vue';

export default {
  name: "TutorialsList",
  //components: { Tooltip },
  data() {
    return {
      columns: [
        { title: "Lecture", path: "lecture", component: LecHover },
        { title: "Title", path: "title" },
        { title: "Scheduling", path: "scheduling" },
        { title: "Tutor", path: "tutor", component: TutorPp },
        { title: "", path: "isActive", component: IsActive },
      ],
      //headers: ["Lecture", "Title", "Scheduling", "Tutor", ""],
      rows: [],
      tutorials: [],
      corpus: "",
    };
  },
  created() {
    axios
      .get("http://localhost:3000/tutorials")
      .then((response) => {
        this.tutorials = response.data;
        this.listTuts();
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    getDesc: function (hovered, index) {
      if (hovered === "lecture") {
        axios
          .get(
            "http://localhost:3000/lecture/" + this.tutorials[index].lecture._id
          )
          .then((response) => {
            this.rows[index].lectureDesc = response.data.description;
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    listTuts: function () {
      //this.tutorials.forEach(element => console.log(element.lecture._id));
      for (var i = 0; i < this.tutorials.length; i++) {
        this.rows.push({
          //lecture: this.tutorials[i].lecture.title,
          lecture: this.tutorials[i].lecture.title,
          title: this.tutorials[i].title,
          scheduling: this.tutorials[i].frequency,
          tutor: this.tutorials[i].tutor,
          isActive: this.tutorials[i].is_active,
          id: this.tutorials[i]._id,
        });
      }
    },
  },
};
</script>