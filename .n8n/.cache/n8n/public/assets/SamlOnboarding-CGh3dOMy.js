import { It as ref, P as defineComponent, Pt as reactive, T as createBlock, et as openBlock } from "./vue.runtime.esm-bundler-tP5dCd7J.js";
import { gt as useI18n } from "./_MapCache-B8tCBNv0.js";
import "./src-hSycJ2mR.js";
import "./en-b3uD8cvU.js";
import "./preload-helper-CR0ecmWK.js";
import "./_plugin-vue_export-helper-BwBpWJRZ.js";
import { y as useRouter } from "./truncate-CPQnASOt.js";
import "./icon-BbrtmrJd.js";
import "./empty-Dn9EY6Kk.js";
import { nr as useUsersStore } from "./useTelemetry-uuuKTA_V.js";
import { t as useToast } from "./useToast-BbkTJzz2.js";
import "./sanitize-html-CuGdF3xj.js";
import "./CalendarDate-DxkU3CHY.js";
import { Io as VIEWS } from "./constants-Cr7jJokO.js";
import "./merge-B7TRL2c3.js";
import "./_baseOrderBy-CvT5H2i5.js";
import "./dateformat-CaoB5ai3.js";
import "./useDebounce-DuwIMVRs.js";
import "./useExternalHooks-BwGCtu7b.js";
import "./useStyles-CEyEF3kW.js";
import "./sso.store-DWuHSku9.js";
import { t as AuthView_default } from "./AuthView-CnNFhXPk.js";
var SamlOnboarding_default = /* @__PURE__ */ defineComponent({
	__name: "SamlOnboarding",
	setup(__props) {
		const router = useRouter();
		const locale = useI18n();
		const toast = useToast();
		const usersStore = useUsersStore();
		const loading = ref(false);
		const FORM_CONFIG = reactive({
			title: locale.baseText("auth.signup.setupYourAccount"),
			buttonText: locale.baseText("auth.signup.finishAccountSetup"),
			inputs: [{
				name: "firstName",
				initialValue: usersStore.currentUser?.firstName,
				properties: {
					label: locale.baseText("auth.firstName"),
					maxlength: 32,
					required: true,
					autocomplete: "given-name",
					capitalize: true
				}
			}, {
				name: "lastName",
				initialValue: usersStore.currentUser?.lastName,
				properties: {
					label: locale.baseText("auth.lastName"),
					maxlength: 32,
					required: true,
					autocomplete: "family-name",
					capitalize: true
				}
			}]
		});
		const isFormWithFirstAndLastName = (values) => {
			return "firstName" in values && "lastName" in values;
		};
		const onSubmit = async (values) => {
			if (!isFormWithFirstAndLastName(values)) return;
			try {
				loading.value = true;
				await usersStore.updateUserName(values);
				await router.push({ name: VIEWS.HOMEPAGE });
			} catch (error) {
				loading.value = false;
				toast.showError(error, "Error", error.message);
			}
		};
		return (_ctx, _cache) => {
			return openBlock(), createBlock(AuthView_default, {
				form: FORM_CONFIG,
				"form-loading": loading.value,
				onSubmit
			}, null, 8, ["form", "form-loading"]);
		};
	}
});
export { SamlOnboarding_default as default };
