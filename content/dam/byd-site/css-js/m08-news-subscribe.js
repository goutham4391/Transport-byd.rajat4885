axios.defaults.withCredentials = true;
Vue.createApp({
  setup() {
    let formData = Vue.reactive({
      email: "",
      checked: false
    });
    let remindList = Vue.reactive({
      email: false,
      checked: false
    });
    let isPass = Vue.ref(true);
    let overlay = Vue.ref(false);
    let isSuccess = Vue.ref(false);
    const reg = /^[\w\.]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    Vue.watch(() => formData.email, () => {
      remindList.email = !reg.test(formData.email);
    });
    Vue.watch(() => formData.checked, () => {
      remindList.checked = !formData.checked;
    });
    const formAction = Vue.ref(null);
    const submitForm = () => {
      var _a;
      isPass.value = true;
      remindList.email = !reg.test(formData.email);
      remindList.checked = !formData.checked;
      for (const i in remindList) {
        if (remindList[i]) {
          isPass.value = false;
        }
      }
      console.log(isPass.value);
      if (isPass.value) {
        axios.post((_a = formAction == null ? void 0 : formAction.value) == null ? void 0 : _a.dataset["action"], {
          email: formData.email
        }).then((res) => {
          overlay.value = true;
          if (res.statusText == "OK") {
            isSuccess.value = true;
            setTimeout(() => {
              formData.email = "";
              formData.checked = false;
            }, 2e3);
            setTimeout(() => {
              for (const i in remindList) {
                remindList[i] = false;
              }
            }, 2e3);
          } else {
            isSuccess.value = false;
          }
          setTimeout(() => {
            overlay.value = false;
          }, 2e3);
        }).catch(() => {
          overlay.value = true;
          isSuccess.value = false;
          setTimeout(() => {
            overlay.value = false;
          }, 2e3);
        });
      }
    };
    return {
      formData,
      formAction,
      remindList,
      submitForm,
      isSuccess,
      overlay
    };
  }
}).mount(".m08-wrap");
