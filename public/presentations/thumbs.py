import os
import fitz  # PyMuPDF

def convert_pdfs_to_pngs():
    # Get the directory where the script is located
    folder = os.path.dirname(os.path.abspath(__file__))
    
    # Loop through all files in the directory
    for filename in os.listdir(folder):
        if filename.lower().endswith(".pdf"):
            pdf_path = os.path.join(folder, filename)
            png_path = os.path.join(folder, os.path.splitext(filename)[0] + ".png")
            
            # Open the PDF
            with fitz.open(pdf_path) as pdf:
                if pdf.page_count > 0:
                    page = pdf.load_page(0)  # Load first page
                    pix = page.get_pixmap(dpi=400)  # Render at 400 DPI for good quality
                    pix.save(png_path)
                    print(f"✅ Saved: {png_path}")
                else:
                    print(f"⚠️ Skipped (empty PDF): {filename}")

if __name__ == "__main__":
    convert_pdfs_to_pngs()
