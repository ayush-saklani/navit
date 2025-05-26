export const serverlink = "https://navit.azurewebsites.net";               // navit azure server link 
export const serverlink2 = "https://class-sync-azure.azurewebsites.net";   // classsync azure server link

export const dynamic_options = { // options for courses, semesters, sections
    arr: ["08", "12"],
    dep: ["01", "04", "06"],
    curr_term: "even",
    courses: [
        {
            course_id: "btechcse",
            course_name: "BTech CSE",
            total_sem: 8,
            sections: {
                "1": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
                "2": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
                "3": ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2", "E1", "E2", "F1", "F2", "G1", "G2", "H1", "H2", "I1", "I2", "J1", "J2", "K1", "K2", "L1", "L2"],
                "4": ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2", "E1", "E2", "F1", "F2", "G1", "G2", "H1", "H2", "I1", "I2", "J1", "J2", "K1", "K2", "L1", "L2"],
                "5": ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2", "E1", "E2", "F1", "F2", "G1", "G2", "H1", "H2", "I1", "J1", "J2", "K1", "K2", "L1", "L2", "S"],
                "6": ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2", "E1", "E2", "F1", "F2", "G1", "G2", "H1", "H2", "I1", "J1", "J2", "K1", "K2", "L1", "L2", "S"],
                "7": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
                "8": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
            }
        },
        {
            course_id: "btechcseintegrated",
            course_name: "BTech CSE Integrated",
            total_sem: 12,
            sections: {
                "1": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
                "2": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
                "3": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
                "4": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
                "5": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
                "6": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
                "7": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
                "8": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
                "9": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
                "10": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
                "11": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
                "12": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S"],
            }
        },
        {
            course_id: "diplomacse",
            course_name: "Diploma (CSE)",
            total_sem: 6,
            sections: {
                "1": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                "2": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                "3": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                "4": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                "5": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                "6": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
            }
        },
        {
            course_id: "btechme",
            course_name: "BTech ME",
            total_sem: 8,
            sections: {
                "1": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                "2": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                "3": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                "4": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                "5": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                "6": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                "7": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                "8": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
            }
        },
        {
            course_id: "bca",
            course_name: "BCA",
            total_sem: 6,
            sections: {
                "1": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                "2": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                "3": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                "4": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                "5": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
                "6": ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
            }
        },
        {
            course_id: "mca",
            course_name: "MCA",
            total_sem: 6,
            sections: {
                "1": ["A", "B", "C", "D", "E"],
                "2": ["A", "B", "C", "D", "E"],
                "3": ["A", "B", "C"],
                "4": ["A", "B", "C"],
                "5": ["A", "B", "C"],
                "6": ["A", "B", "C"],
            }
        }
    ]
};