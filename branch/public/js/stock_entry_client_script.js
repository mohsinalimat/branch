frappe.ui.form.on('Stock Entry',  {
    refresh: function(frm) {
        if(frm.is_new()) {
            frm.doc.company_branch = undefined;
            frm.refresh_field("company_branch");
        $.each(frm.doc.items,  function(i,  d) {
            d.s_warehouse = undefined;
            d.t_warehouse = undefined;
        });
        }
    } 
});



frappe.ui.form.on("Stock Entry", "onload", function(frm) {
    frm.set_query("company_branch", function() {
        return {
            "filters": {
                "company": frm.doc.company
            }
        };
    });
});


frappe.ui.form.on("Stock Entry", "company_branch", function(frm) {
    frm.set_query("from_warehouse", function() {
        if(frm.doc.stock_entry_type != "Material Transfer"){
        return {
            "filters": {
                "company": frm.doc.company,
                "company_branch": frm.doc.company_branch
                }
            };
        }
    });
});



frappe.ui.form.on("Stock Entry", "company_branch", function(frm) {
    frm.set_query("to_warehouse", function() {
       // if(frm.doc.stock_entry_type != "Material Transfer"){
        return {
            "filters": {
                "company": frm.doc.company,
                "company_branch": frm.doc.company_branch
       //     }
            }
        };
    });
});





frappe.ui.form.on("Stock Entry", {
  company_branch: function (frm) {
    frm.set_query("s_warehouse", "items", function (doc, cdt, cdn) {
      let row = locals[cdt][cdn];
      if(frm.doc.stock_entry_type != "Material Transfer"){
      return {
        "filters": {
          "company": frm.doc.company,
          "company_branch": frm.doc.company_branch
        },
      };
      }
    });
  },
});






frappe.ui.form.on("Stock Entry", {
  company_branch: function (frm) {
    frm.set_query("t_warehouse", "items", function (doc, cdt, cdn) {
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