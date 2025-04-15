document.addEventListener("DOMContentLoaded", function () {
    // Setup variables
    const questions = document.querySelectorAll(".question");
    const totalQuestions = questions.length;
    let currentQuestionIndex = 0;
    let userAnswers = {};
    let quizStarted = false;
    let quizSubmitted = false;

    // Timer setup - 30 minutes
    let timeLeft = 3 * 60 * 60;  // 3 hours in seconds
    const timerElement = document.getElementById("timer");

    // Navigation buttons
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const submitBtn = document.getElementById("submitBtn");
    const resultDiv = document.getElementById("result");

    // Question navigation panel
    const rightBox = document.querySelector(".right.box");

    // Correct answers
    const correctAnswers = {
        q1: "C", // Head of the Council of Ministers
        q2: "B", // Chairman of Rajya Sabha
        q3: "A", // Carrying on the business of the
        q4: "D", // The President
        q5: "C", // Through the Prime Minister and Council of Ministers
        q6: "B", // The President
        q7: "A", // 12
        q8: "D", // The Prime Minister
        q9: "C", // Money Bill
        q10: "D", // The President
        q11: "B", // The President
        q12: "A", // Article 352
        q13: "B", // President's Rule
        q14: "C", // Article 360
        q15: "D", // All of the above
        q16: "C", // The President
        q17: "A", // On the recommendation of the Prime Minister
        q18: "C", // Vice-President
        q19: "B", // A new President is elected
        q20: "A", // An electoral college consisting of members of both Houses of Parliament
        q21: "D", // 35 years
        q22: "B", // 5 years
        q23: "A", // Deputy Chairman of Rajya Sabha
        q24: "D", // All of the above
        q25: "B", // Support of the majority party/members in Lok Sabha
        q26: "C", // The Prime Minister
        q27: "D", // The Prime Minister
        q28: "A", // The Prime Minister
        q29: "C", // Dissolution of the Council of Ministers
        q30: "B", // A majority in Lok Sabha
        q31: "C", // Making policy decisions for the Government
        q32: "D", // The Parliament
        q33: "A", // The Prime Minister must resign
        q34: "C", // The Parliament
        q35: "B", // The members of the Lok Sabha
        q36: "D", // The Speaker of the Lok Sabha
        q37: "B", // The Prime Minister and the Leader of the Opposition
        q38: "A",
        q39: "C", // Governor appoints the Chief Minister of a state
        q40: "D", // Governor appoints Vice-Chancellors of universities
        q41: "B", // Governor appoints Chairman and members of State Public Service Commission
        q42: "C", // Governor rules the state directly during President's Rule
        q43: "A", // Governor acts as a link between state and President
        q44: "B", // Governor can disregard Council of Ministers' recommendations during emergency
        q45: "C", // Governor acts as President's representative during President's Rule
        q46: "B", // Chief Minister cannot appoint the Governor of the state
        q47: "A", // Chief Minister can be removed by vote of no confidence
        q48: "C", // Rajya Sabha consists of 250 members
        q49: "D", // Rajya Sabha never gets dissolved
        q50: "B", // One-third of Rajya Sabha members retire every two years
        q51: "A", // Voting age for Lok Sabha elections is 18 years
        q52: "C", // Tenure of Lok Sabha is 5 years
        q53: "B", // Lok Sabha elections are based on universal adult franchise
        q54: "D", // Deputy Speaker presides over Lok Sabha in Speaker's absence
        q55: "C", // Central Government law prevails over state law on Concurrent List subjects
        q56: "A", // Legislative Assembly can introduce money bill
        q57: "D", // Governor gives assent to state legislature bills
        q58: "C", // No-confidence motion can remove ministers
        q59: "B", // Primary function of state legislature is law making
        q60: "D", // Parliament's law prevails in case of conflict on Concurrent List
        q61: "B", // Supreme Court has final authority in Indian judicial system
        q62: "C", // Person can appeal to higher court if judgment is unjust
        q63: "B", // Integrated Judicial System means higher court decisions bind lower courts
        q64: "C", // Article 324 deals with Election Commission of India
        q65: "D", // President appoints Chief Election Commissioner
        q66: "A", // Election Commission is a Constitutional body
        q67: "B", // ECI doesn't conduct Municipality elections
        q68: "C", // ECI cannot recommend President's Rule
        q69: "B", // State Election Commission conducts Panchayat elections
        q70: "D", // Model Code of Conduct ensures fair conduct by political parties
        q71: "C", // Election Commission decides election schedules
        q72: "C", // Election Commission can cancel polls due to irregularities
        q73: "B", // Chief Election Commissioner removed by President on Parliament's recommendation
        q74: "C", // President appoints UPSC Chairman and members
        q75: "D", // UPSC responsible for recruitment to All India Services
        q76: "B", // Main function of UPSC is appointment of civil servants
        q77: "C", // UPSC has 9 members including Chairman
        q78: "B", // UPSC has Constitutional status
        q79: "A", // UPSC is a recruiting agency
        q80: "C", // President can remove UPSC Chairman
        q81: "D", // B.R. Ambedkar is Father of Indian Constitution
        q82: "A", // Indian Parliament consists of Lok Sabha, Rajya Sabha, and President
        q83: "D", // Supreme Court is highest court of appeal
        q84: "B", // Supreme Court judges retire at 65 years
        q85: "D", // Subordinate courts are at lowest level
        q86: "B", // Supreme Court has 34 judges including Chief Justice
        q87: "B", // Justice P.N. Bhagwati introduced PIL
        q88: "C", // Election Commission conducts elections for President, Vice President, Parliament and State Legislatures
        q89: "D", // Election Commission has all listed powers
        q90: "B", // Election Commission enforces Model Code of Conduct
        q91: "A", // Lok Sabha is the lower house of Indian Parliament
        q92: "C", // Speaker is the presiding officer of Lok Sabha
        q93: "B", // President has power to summon or prorogue Parliament sessions
        q94: "B", // Rajya Sabha members have 6-year terms
        q95: "C", // No-confidence motion leads to Council of Ministers resignation
        q96: "B", // Speaker of Lok Sabha presides over joint session
        q97: "C", // President appoints Governor of state
        q98: "A", // Normal term of Governor is 5 years
        q99: "B", // Governor holds office at pleasure of President
        q100: "D", // Governor doesn't pass laws on Central subjects
        q101: "C", // During President's Rule, Governor administers on behalf of President
        q102: "C", // Speaker has casting vote in Legislative Assembly
        q103: "B", // Speaker's primary role is to preside over Lok Sabha meetings
        q104: "C", // Speaker can suspend Lok Sabha member for unruly behavior
        q105: "B", // Speaker remains in office until next Lok Sabha is constituted
        q106: "C", // UPSC conducts examinations for All-India Services appointments
        q107: "B", // President is head of Indian State
        q108: "B", // President is symbol of unity, integrity and solidarity
        q109: "C", // President elected by Electoral College members
        q110: "A", // Nominated Rajya Sabha members not part of Presidential Electoral College
        q111: "C", // Minimum age for President is 35 years
        q112: "D", // Presidential candidate must be eligible for Lok Sabha membership
        q113: "C", // Presidential nomination requires 50 proposers
        q114: "B", // Presidential nomination requires 50 seconders
        q115: "C", // Chief Justice administers President's oath
        q116: "B", // Senior-most Supreme Court judge administers oath if Chief Justice absent
        q117: "C", // Parliament determines President's emoluments and privileges
        q118: "B", // President resides at Rashtrapati Bhavan
        q119: "B", // President appoints Prime Minister
        q120: "C", // President appoints Attorney General
        q121: "C", // President appoints Chiefs of Army, Navy, Air Force
        q122: "B", // President is Supreme Commander of Defence Forces
        q123: "C", // President appoints CAG
        q124: "B", // President declares war or concludes peace
        q125: "C", // Pardon power removes both sentence and conviction
        q126: "C", // Commutation means converting to lighter punishment
        q127: "B", // Remission reduces period of sentence
        q128: "C", // Articles 63-71 relate to Vice-President
        q129: "B", // Vice-President holds second rank in Indian Republic
        q130: "C", // Vice-President elected by both Houses of Parliament
        q131: "D", // Vice-Presidential election uses secret ballot
        q132: "D", // State Legislative Assembly members not part of Vice-President's Electoral College
        q133: "B", // Vice-President removal requires resolution by both Houses
        q134: "B", // Rajya Sabha needs effective majority for Vice-President removal
        q135: "D", // Lok Sabha needs simple majority for Vice-President removal
        q136: "D", // No specific ground mentioned for removing Vice-President
        q137: "C", // Vice-President is ex-officio Chairperson of Rajya Sabha
        q138: "C", // Vice-President doesn't perform Chairperson duties when acting as President
        q139: "C", // Vice-President's duty as Chairman is to maintain order and procedure
        q140: "C", // Rajya Sabha Chairman salary not payable during Vice-President's tenure as Acting President
        q141: "C", // Vice-President acts as President till new election
        q142: "A", // Vice-President doesn't hold office of profit
        q143: "B", // Vice-President office inspired by American system
        q144: "C", // President appoints Prime Minister under Article 75
        q145: "B", // 272 seats needed for majority government
        q146: "C", // President exercises discretion when no party has clear majority
        q147: "B", // PM must resign or can be dismissed when losing majority
        q148: "D", // Parliament determines PM's salary and allowances
        q149: "C", // Prime Minister presides over Council of Ministers meetings
        q150: "B", // Council of Ministers gets automatically dissolved if PM resigns


    };

    // Initialize question navigation buttons
    for (let i = 1; i <= totalQuestions; i++) {
        let btn = document.createElement("button");
        btn.classList.add("btn");
        btn.textContent = i;
        btn.addEventListener("click", function () {
            showQuestion(i - 1);
        });
        rightBox.appendChild(btn);
    }

    // Track answer changes
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function () {
            const questionName = this.name;
            const questionNumber = parseInt(questionName.substring(1)) - 1;
            userAnswers[questionName] = this.value;

            // Update the navigation button to show it's been answered
            document.querySelectorAll('.right.box .btn')[questionNumber].classList.add('answered');
        });
    });

    // Function to display a specific question
    function showQuestion(index) {
        questions.forEach((q, i) => {
            q.style.display = i === index ? "block" : "none";
        });

        // Update navigation buttons
        if (!quizSubmitted) {
            prevBtn.style.display = index === 0 ? "none" : "inline-block";
            nextBtn.style.display = index === questions.length - 1 ? "none" : "inline-block";
            submitBtn.style.display = index === questions.length - 1 ? "block" : "none";
        } else {
            // After submission, always show prev/next buttons (except at boundaries)
            prevBtn.style.display = index === 0 ? "none" : "inline-block";
            nextBtn.style.display = index === questions.length - 1 ? "none" : "inline-block";
            submitBtn.style.display = "none";  // Hide submit button after submission
        }

        // Update the active question button
        document.querySelectorAll('.right.box .btn').forEach((btn, i) => {
            btn.classList.toggle('active', i === index);
        });

        currentQuestionIndex = index;
    }

    // Initialize timer
    function updateTimer() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (timeLeft > 0 && !quizSubmitted) {
            timeLeft--;
            setTimeout(updateTimer, 1000);
        } else if (!quizSubmitted) {
            // Time's up - auto submit
            submitQuiz();
        }
    }

    // Submit the quiz
    function submitQuiz(violation = false) {
        quizSubmitted = true;
        let score = 0;
        let answeredCount = 0;

        // Calculate score
        for (let key in correctAnswers) {
            if (userAnswers[key]) {
                answeredCount++;
                if (userAnswers[key] === correctAnswers[key]) {
                    score++;
                }
            }
        }

        // Display result
        const timeExpired = timeLeft <= 0;
        resultDiv.innerHTML = `
            <h2>Quiz Results</h2>
            <p>Your Score: ${score}/${totalQuestions}</p>
            <p>Questions Answered: ${answeredCount}/${totalQuestions}</p>
            ${timeExpired ? '<p>Time Expired!</p>' : ''}
            <h3>Question Summary</h3>
            <div id="question-summary"></div>
        `;

        // Create and append question summary
        const summaryDiv = document.getElementById("question-summary");
        for (let i = 1; i <= totalQuestions; i++) {
            const qKey = `q${i}`;
            const userAnswer = userAnswers[qKey] || "Not Attempted";
            const isCorrect = userAnswers[qKey] === correctAnswers[qKey];
            const wasAttempted = userAnswers[qKey] !== undefined;

            let statusClass = "not-attempted";
            let statusText = "Not Attempted";

            if (wasAttempted) {
                if (isCorrect) {
                    statusClass = "correct";
                    statusText = "Correct";
                } else {
                    statusClass = "incorrect";
                    statusText = "Incorrect";
                }
            }

            const questionSummary = document.createElement("div");
            questionSummary.className = `question-result ${statusClass}`;
            questionSummary.innerHTML = `
                <p>Question ${i}: <span class="${statusClass}">${statusText}</span></p>
                <p>Your Answer: ${userAnswer}</p>
                <p>Correct Answer: ${correctAnswers[qKey]}</p>
            `;
            summaryDiv.appendChild(questionSummary);
        }

        // Add styles for the question summary
        const styleEl = document.createElement("style");
        styleEl.textContent = `
            #question-summary {
                max-height: 400px;
                overflow-y: auto;
                margin-top: 20px;
            }
            .question-result {
                border: 1px solid #ddd;
                border-radius: 5px;
                padding: 10px;
                margin-bottom: 10px;
                background-color: #f9f9f9;
            }
            .correct {
                color: green;
                font-weight: bold;
            }
            .incorrect {
                color: red;
                font-weight: bold;
            }
            .not-attempted {
                color: orange;
                font-weight: bold;
            }
        `;
        document.head.appendChild(styleEl);

        resultDiv.style.display = "block";

        // Disable all inputs but keep navigation buttons enabled
        document.querySelectorAll("input[type=radio]").forEach(input => {
            input.disabled = true;
        });

        // Only disable submit button, keep navigation buttons active
        submitBtn.disabled = true;

        // Highlight correct and incorrect answers on the quiz interface
        questions.forEach((question, qIndex) => {
            const qName = `q${qIndex + 1}`;
            const options = question.querySelectorAll("label");
            const userChoice = userAnswers[qName];
            const correctChoice = correctAnswers[qName];
            
            options.forEach(label => {
                const input = label.querySelector("input");
                const value = input.value;
                
                // Reset any existing styling
                label.classList.remove("correct-answer", "incorrect-answer", "user-choice");
                
                // Apply new styling based on correctness
                if (value === correctChoice) {
                    label.classList.add("correct-answer");
                }
                
                if (userChoice === value && userChoice !== correctChoice) {
                    label.classList.add("incorrect-answer");
                }
                
                if (userChoice === value) {
                    label.classList.add("user-choice");
                }
            });
        });

        // Add CSS for answer labels
        const quizStyleEl = document.createElement("style");
        quizStyleEl.textContent = `
            .correct-answer {
                background-color: rgba(0, 128, 0, 0.2) !important;
                border-left: 5px solid green !important;
                padding-left: 10px !important;
                font-weight: bold;
                position: relative;
            }
            
            .correct-answer::after {
                content: "✓ Correct Answer";
                position: absolute;
                right: 10px;
                color: green;
                font-weight: bold;
            }
            
            .incorrect-answer {
                background-color: rgba(255, 0, 0, 0.1) !important;
                border-left: 5px solid red !important;
                padding-left: 10px !important;
                text-decoration: line-through;
                color: #777;
                position: relative;
            }
            
            .incorrect-answer::after {
                content: "✗ Incorrect";
                position: absolute;
                right: 10px;
                color: red;
                font-weight: bold;
            }
            
            .user-choice {
                font-weight: bold;
            }
            
            label {
                display: block;
                margin: 10px 0;
                padding: 10px;
                border-radius: 5px;
                border: 1px solid #ddd;
                transition: all 0.3s ease;
            }
        `;
        document.head.appendChild(quizStyleEl);

        // End quiz state
        quizStarted = false;
        
        // Update navigation display after submission
        showQuestion(currentQuestionIndex);
    }

    // Event listeners
    prevBtn.addEventListener("click", function () {
        if (currentQuestionIndex > 0) {
            showQuestion(currentQuestionIndex - 1);
        }
    });

    nextBtn.addEventListener("click", function () {
        if (currentQuestionIndex < questions.length - 1) {
            showQuestion(currentQuestionIndex + 1);
        }
    });

    submitBtn.addEventListener("click", function () { submitQuiz(false); });

    // Initialize the quiz and start timer immediately
    showQuestion(0);
    quizStarted = true;
    updateTimer();
});