frappe.ui.form.on('Quotation',  {
    refresh: function(frm) {
        if(frm.is_new()) {
        $.each(frm.doc.items,  function(i,  d) {
            d.warehouse = undefined;
        });
        }
    } 
});


frappe.ui.form.on("Quotation", "onload", function(frm) {
    frm.set_query("company_branch", function() {
        return {
            "filters": {
                "company": frm.doc.company
                }
            };
    });
});

frappe.ui.form.on("Quotation", {
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