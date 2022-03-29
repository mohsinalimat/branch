frappe.ui.form.on('Delivery Note',  {
    refresh: function(frm) {
        if(frm.is_new()) {
            frm.doc.company_branch = undefined;
            frm.doc.set_warehouse = undefined;
            frm.doc.set_target_warehouse = undefined;
            frm.refresh_field("company_branch");
            frm.refresh_field("set_warehouse");
            frm.refresh_field("set_target_warehouse");
        $.each(frm.doc.items,  function(i,  d) {
            d.warehouse = undefined;
            d.target_warehouse = undefined;
        });
        }
    } 
});


frappe.ui.form.on("Delivery Note", "onload", function(frm) {
    frm.set_query("company_branch", function() {
        return {
            "filters": {
                "company": frm.doc.company
                }
            };
    });
});



frappe.ui.form.on("Delivery Note", "onload", function(frm) {
    frm.set_query("set_warehouse", function() {
        return {
            "filters": {
                "company": frm.doc.company,
                "company_branch": frm.doc.company_branch
                }
            };
    });
});

frappe.ui.form.on("Delivery Note", "onload", function(frm) {
    frm.set_query("set_target_warehouse", function() {
        return {
            "filters": {
                "company": frm.doc.company,
                "company_branch": frm.doc.company_branch
                }
            };
    });
});



frappe.ui.form.on("Delivery Note", {
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


frappe.ui.form.on("Delivery Note", {
  onload: function (frm) {
    frm.set_query("target_warehouse", "items", function (doc, cdt, cdn) {
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