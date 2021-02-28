<template>
  <div id="chart" />
</template>

<script lang="ts">
import { defineComponent, computed, watch, onMounted } from "vue";
import type { PropType } from "vue";
import Highcharts from "highcharts";
import type { SeriesLineOptions } from "highcharts";

export default defineComponent({
  props: {
    series: {
      type: Array as PropType<SeriesLineOptions[]>,
      required: true,
    },
  },

  setup(props) {
    const chartOptions = computed(() => {
      return {
        chart: {
          renderTo: "chart",
          scrollablePlotArea: {
            minWidth: 680,
            scrollPositionX: 0,
          },
        },
        title: {
          text: "総人口",
        },
        series: props.series,
        xAxis: {
          title: {
            text: "年度",
          },
        },
        yAxis: {
          title: {
            text: "人口数",
          },
        },
      };
    });

    onMounted(() => {
      Highcharts.chart(chartOptions.value);
    });

    watch(chartOptions, (newValue) => {
      Highcharts.chart(newValue);
    });
  },
});
</script>
