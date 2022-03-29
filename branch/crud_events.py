import frappe
import erpnext
import branch

def before_submit_gl_entry(doc, event):
    if doc.against_company_branch:
        doc.company_branch = doc.against_company_branch
        pass
    else:
        doc.company_branch = doc.voucher_company_branch
        pass

def before_submit_payment_entry(doc, event):
    for d in doc.get("references"):
        if doc.custom_remarks == 0:
            if d.reference_doctype == "Sales Invoice":    
                remarks = set( ( d.company_branch + ': ' + '<a href= "/app/sales-invoice/{0}">').format(d.reference_name) + d.reference_name + '</a>' for d in doc.get("references", []))
                doc.remarks = ', \n '.join(remarks)
                pass
            elif d.reference_doctype == "Purchase Invoice":    
                remarks = set( ( d.company_branch + ': ' + '<a href= "/app/purchase-invoice/{0}">').format(d.reference_name) + d.reference_name + '</a>' for d in doc.get("references", []))
                doc.remarks = ', \n '.join(remarks)
                pass
            else:
                remarks = set( d.company_branch + ': ' +  d.reference_name for d in doc.get("references", []))
                doc.remarks = ', \n '.join(remarks)
                pass