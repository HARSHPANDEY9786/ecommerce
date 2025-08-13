let classes = {};
let currentClass = "";

function showAddStudentForm() {
    document.getElementById("addStudentPopup").style.display = "block";
}

function showAddClassForm() {
    document.getElementById("addClassPopup").style.display = "block";
}

function closePopup() {
    document.getElementById("addStudentPopup").style.display = "none";
    document.getElementById("addClassPopup").style.display = "none";
}

function addClass() {
    const className = document.getElementById("newClassName").value.trim();
    if (className && !classes[className]) {
        classes[className] = [];
        const selector = document.getElementById("classSelector");
        const option = document.createElement("option");
        option.value = className;
        option.textContent = className;
        selector.appendChild(option);
        document.getElementById("newClassName").value = "";
        closePopup();
    }
}

function addStudent() {
    const name = document.getElementById("newStudentName").value.trim();
    const roll = document.getElementById("newStudentRoll").value.trim();
    if (name && roll && currentClass) {
        classes[currentClass].push({ name, roll, status: "Absent" });
        document.getElementById("newStudentName").value = "";
        document.getElementById("newStudentRoll").value = "";
        showStudentsList();
        closePopup();
    }
}

function showStudentsList() {
    currentClass = document.getElementById("classSelector").value;
    const list = document.getElementById("studentsList");
    list.innerHTML = "";

    if (classes[currentClass]) {
        classes[currentClass].forEach((student, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${student.name} (${student.roll}) 
                <select onchange="updateStatus(${index}, this.value)">
                    <option value="Present" ${student.status === "Present" ? "selected" : ""}>Present</option>
                    <option value="Absent" ${student.status === "Absent" ? "selected" : ""}>Absent</option>
                    <option value="Leave" ${student.status === "Leave" ? "selected" : ""}>Leave</option>
                </select>
            `;
            list.appendChild(li);
        });
        updateSummary();
    }
}

function updateStatus(index, status) {
    classes[currentClass][index].status = status;
    updateSummary();
}

function updateSummary() {
    const students = classes[currentClass] || [];
    document.getElementById("totalStudents").textContent = students.length;
    document.getElementById("totalPresent").textContent = students.filter(s => s.status === "Present").length;
    document.getElementById("totalAbsent").textContent = students.filter(s => s.status === "Absent").length;
    document.getElementById("totalLeave").textContent = students.filter(s => s.status === "Leave").length;
}

function submitAttendance() {
    const now = new Date();
    document.getElementById("attendanceDate").textContent = now.toLocaleDateString();
    document.getElementById("attendanceTime").textContent = now.toLocaleTimeString();
    document.getElementById("attendanceClass").textContent = currentClass;
    document.getElementById("attendanceTotalStudents").textContent = classes[currentClass].length;
    document.getElementById("attendancePresent").textContent = classes[currentClass].filter(s => s.status === "Present").length;
    document.getElementById("attendanceAbsent").textContent = classes[currentClass].filter(s => s.status === "Absent").length;
    document.getElementById("attendanceLeave").textContent = classes[currentClass].filter(s => s.status === "Leave").length;
    document.getElementById("resultSection").style.display = "block";
}
