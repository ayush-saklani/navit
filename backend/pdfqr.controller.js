import { readFileSync } from "fs";
import { join } from "path";
import sharp from "sharp";
import { toBuffer } from "qrcode";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

const serverlink2 = "https://class-sync-azure.azurewebsites.net";   // classsync azure server link

const fetch_room_status = async () => {
  try {
    const response = await fetch(`${serverlink2}/room/getall`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const result = await response.json();
    const rooms = result.data;
    if (!Array.isArray(rooms) || rooms.length === 0) {
      throw new Error("No room data available");
    } else {
      return rooms;
    }
  } catch (error) {
    console.error(':::: Room Data not available (SERVER ERROR) :::: ', error);
    throw error;
  }
};

const roomtypemap = {
  class: { name: "Classroom", fillcolor: "#01a154" },
  hall: { name: "Hall", fillcolor: "#dc1717" },
  computerlab: { name: "Computer Lab", fillcolor: "#1076b1" },
  englishlab: { name: "English Lab", fillcolor: "#1076b1" },
  electroniclab: { name: "Electronic Lab", fillcolor: "#1076b1" },
  mechanicallab: { name: "Mechanical Lab", fillcolor: "#1076b1" },
  civillab: { name: "Civil Lab", fillcolor: "#1076b1" },
  drawinglab: { name: "Drawing Lab", fillcolor: "#1076b1" },
  physicslab: { name: "Physics Lab", fillcolor: "#1076b1" },
  chemistrylab: { name: "Chemistry Lab", fillcolor: "#1076b1" },
  ladieswashroom: { name: "Ladies Washroom", fillcolor: "#e13ba1" },
  gentswashroom: { name: "Gents Washroom", fillcolor: "#008686" },
  office: { name: "Office", fillcolor: "#458588" },
  staffroom: { name: "Staff Room", fillcolor: "#de8408" },
  other: { name: "Other", fillcolor: "#458588" },
};


const hexToRgb = (hex) => {
  // Remove leading # if present
  hex = hex.replace(/^#/, "");
  // Handle 3-digit hex
  if (hex.length === 3) {
    hex = hex.split("").map((x) => x + x).join("");
  }
  const num = parseInt(hex, 16);
  return [
    (num >> 16) & 255,
    (num >> 8) & 255,
    num & 255
  ];
}

const generateQRpdf = async (roomdata) => {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const customFontBytes = readFileSync("./asset/RubikDirt-Regular.ttf");
  const customFont = await pdfDoc.embedFont(customFontBytes);

  const bgImageBuffer = await sharp("./asset/qrbackground.jpg")
    .resize(1080, 1080)
    .png()
    .toBuffer();
  const bgImage = await pdfDoc.embedPng(bgImageBuffer);

  for (const room of roomdata) {
    if (room.type === "ladieswashroom" || room.type === "gentswashroom") continue;
    const qrBuffer = await toBuffer(`https://navit.vercel.app/home?source=${room.roomid}`,
      {
        width: 560,
        margin: 2,
        color: { dark: "#000000", light: "#ffffff" },
        errorCorrectionLevel: "H",
      }
    );

    const qrSharp = await sharp(qrBuffer)
      .resize(560, 560)
      .png()
      .toBuffer();
    const qrImage = await pdfDoc.embedPng(qrSharp);

    const page = pdfDoc.addPage([1080, 1080]);
    const { width, height } = page.getSize();

    // Draw background
    page.drawImage(bgImage, { x: 0, y: 0, width, height });

    // Draw QR Code
    const qrX = (width - 560) / 2;
    const qrY = 270; // moved lower from 330 to 270
    page.drawImage(qrImage, { x: qrX, y: qrY, width: 560, height: 560 });

    // Draw Room Name
    page.drawText(room.name, {
      x: width / 2 - customFont.widthOfTextAtSize(room.name, 50) / 2,
      y: qrY - 60,
      size: 50,
      font: customFont,
      color: rgb(0.13, 0.13, 0.13),
    });

    // Draw Room Type
    const typeName = roomtypemap[room.type]?.name || "Unknown";
    const hex = roomtypemap[room.type]?.fillcolor || "#000000";
    const [r, g, b] = hexToRgb(hex).map((v) => v / 255);

    page.drawText(typeName, {
      x: width / 2 - customFont.widthOfTextAtSize(typeName, 42) / 2,
      y: qrY - 110,
      size: 42,
      font: customFont,
      color: rgb(r, g, b),
    });
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
export const generateAndSendPDF = async (req, res) => {
  try {
    const roomdata = await fetch_room_status();
    const pdfBytes = await generateQRpdf(roomdata);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=RoomPosters.pdf"
    });
    res.end(Buffer.from(pdfBytes));
  } catch (error) {
    res.status(500).send("Error generating PDF: " + error.message);
  }
};