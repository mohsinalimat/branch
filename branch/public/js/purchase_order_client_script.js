frappe.ui.form.on('Purchase Order',  {
    refresh: function(frm) {
        if(frm.is_new()) {
            frm.doc.company_branch = undefined;
            frm.doc.set_warehouse = undefined;
            frm.doc.supplier_warehouse = undefined;
            frm.refresh_field("company_branch");
            frm.refresh_field("set_warehouse");
            frm.refresh_field("supplier_warehouse");
        $.each(frm.doc.items,  function(i,  d) {
            d.warehouse = undefined;
        });
        }
    } 
});


frappe.ui.form.on("Purchase Order", "onload", function(frm) {
    frm.set_query("company_branch", function() {
        return {
            "filters": {
                "company": frm.doc.company
                }
            };
    });
});



frappe.ui.form.on("Purchase Order", "onload", function(frm) {
    frm.set_query("supplier_warehouse", function() {
        return {
            "filters": {
                "company": frm.doc.company,
                "company_branch": frm.doc.company_branch
                }
            };
    });
});


frappe.ui.form.on("Purchase Order", "onload", function(frm) {
    frm.set_query("set_warehouse", function() {
        return {
            "filters": {
                "company": frm.doc.company,
                "company_branch": frm.doc.company_branch
                }
            };
    });
});



frappe.ui.form.on("Purchase Order", {
  onload: function (frm) {
    frm.set_query("warehouse", "items", function (doc, cdt, cdn) {
      let row = locals[cdt][cdn];
      return {
        "filters": {
          "company": frm.doc.company,
          "company_branch": frm.doc.company_branch
        },
      };
    });
  },
});