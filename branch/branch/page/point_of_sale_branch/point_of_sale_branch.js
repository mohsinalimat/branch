frappe.provide('erpnext.PointOfSale');

frappe.pages['point-of-sale-branch'].on_page_load = function(wrapper) {
	frappe.ui.make_app_page({
		parent: wrapper,
		title: __('Point of Sale - SCS'),
		single_column: true
	});

	// frappe.require("point-of-sale.bundle.js", function() {
		frappe.require("public/js/point_of_sale_scs.js", function() {
		wrapper.pos = new erpnext.PointOfSale.Controller(wrapper);
		window.cur_pos = wrapper.pos;
	});
};

frappe.pages['point-of-sale-branch'].refresh = function(wrapper) {
	if (document.scannerDetectionData) {
		onScan.detachFrom(document);
		wrapper.pos.wrapper.html("");
		wrapper.pos.check_opening_entry();
	}
};