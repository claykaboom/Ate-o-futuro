<template>
    <vuetiful-board
     theme="retro"
    :dark-mode="true"
    :col-num="1"
    :row-height="30"
    :layout-editable="false"
    :datasets="[
      {
          chartInfo: {
            series: [200, 12, 40, 25,  ],
            options: {
              chart: {
                type: 'pie',
              },
              title: {
                text: 'The recent inflow route',
                align: 'center',
                style: {
                  fontSize: '18px',
                  fontWeight: 'bold',
                },
              },
              labels: [
                '❓ Feedback',
                '🚲 Habilidade',
                '⚡ Evento',
                '💡 Ideia'  
              ],
              fill: {
                opacity: 1,
              },
              legend: {
                position: 'bottom',
              }
            }
          },
          gridInfo: {
            x: 0, y: 0 ,w : 300, h: 30, i: '1', static: true
          },
        },
    ]"
  />
</template>
