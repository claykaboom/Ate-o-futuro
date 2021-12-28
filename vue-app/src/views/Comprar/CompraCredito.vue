<template>
  <layout-default>
    <div class="box">
      <Chart type="radar" :data="chartData" :options="chartOptions" />

      <div v-if="!paidFor">NAO PAGOU AINDA</div>
      <div ref="paypal"></div>
    </div>
  </layout-default>
</template>
<script>
// import { loadScript } from "@paypal/paypal-js";
// loadScript({ "client-id": AYEYVzIWFdo4Qv8YTRzbgcZ7rjDiJAgAdSC-h2NfOmvEIm1QSYgLRIDzAu0Mai66PpHWJ7zu0g2KWEzM })
//   .then((paypal) => {
//     // start to use the PayPal JS SDK script
//   })
//   .catch((err) => {
//   console.error("failed to load the PayPal JS SDK script", err);
// });
import Chart from 'primevue/chart'

export default {
 components: {
    Chart
  },
  data() {
    return {
      chartData: {
        labels: [
          "Eating",
          "Drinking",
          "Sleeping",
          "Designing",
          "Coding",
          "Cycling",
          "Running",
        ],
        datasets: [
          {
            label: "My First dataset",
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: [65, 59, 90, 81, 56, 55, 40],
          },
          {
            label: "My Second dataset",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            pointBackgroundColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            data: [28, 48, 40, 19, 96, 27, 100],
          },
        ],
      },
      chartOptions: {
        plugins: {
          legend: {
            labels: {
              color: "#495057",
            },
          },
        },
        scales: {
          r: {
            pointLabels: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
            angleLines: {
              color: "#ebedef",
            },
          },
        },
      },
      loaded: false,
      paidFor: false,
      product: { price: 12.52, description: "sbc", img: "ds" },
    };
  },
  mounted() {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?currency=BRL&client-id=AYEYVzIWFdo4Qv8YTRzbgcZ7rjDiJAgAdSC-h2NfOmvEIm1QSYgLRIDzAu0Mai66PpHWJ7zu0g2KWEzM";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
  methods: {
    setLoaded() {
      this.loaded = true;
      var thisVM = this;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.product.description,
                  amount: { currency_code: "BRL", value: this.product.price },
                },
              ],
            });
          },
          onApprove: function (data, actions) {
            return actions.order.capture().then(function (orderData) {
              // Successful capture! For demo purposes:
              console.log(
                "Capture result",
                orderData,
                JSON.stringify(orderData, null, 2)
              );
              var transaction =
                orderData.purchase_units[0].payments.captures[0];
              alert(
                "Transaction " +
                  transaction.status +
                  ": " +
                  transaction.id +
                  "\n\nSee console for all available details"
              );
              debugger;
              thisVM.paidFor = true;
              // Replace the above to show a success message within this page, e.g.
              // const element = document.getElementById('paypal-button-container');
              // element.innerHTML = '';
              // element.innerHTML = '<h3>Thank you for your payment!</h3>';
              // Or go to another URL:  actions.redirect('thank_you.html');
            });
          },
          onShippingChange: (data, actions) => {
            // alert("mudou");
            if (data.shipping_address.country_code !== "BR") {
              return actions.reject();
            }
            return actions.resolve();
          },
          onError: function () {
            return (err) => {
              console.error(err);
              window.location.href = "/your-error-page-here";
            };
          },
        })
        .render(this.$refs.paypal);
    },
  },
};
</script>