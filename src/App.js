

import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import { Layout } from "./components/layout/Layout";
import { Button } from "./components/ui/Button";
import { WeekToggle } from "./components/dashboard/WeekToggle";
import { DatePicker } from "./components/dashboard/DatePicker";
import { DayCard } from "./components/dashboard/DayCard";
import { DayModal } from "./components/dashboard/DayModal";
import { ShoppingList } from "./components/dashboard/ShoppingList";
import { mealPlans } from "./data/mealPlans";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { getDateForDay } from "./utils/dateHelpers";

function App() {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [completedDays, setCompletedDays] = useLocalStorage(
    "keto-completed-days",
    []
  );
  const [startDate, setStartDate] = useLocalStorage(
    "keto-start-date",
    new Date().toISOString().split("T")[0]
  );
  const [customMealPlans, setCustomMealPlans] = useLocalStorage(
    "keto-custom-meal-plans",
    {}
  );
  const [lastMealPlans, setLastMealPlans] = useState(null); // 🟢 Used for undo
  const [isLoading, setIsLoading] = useState(false); // 🟢 Controls loading spinner
  const [showConfirmShuffle, setShowConfirmShuffle] = useState(false); // 🟢 Controls confirmation modal
  const [showStartOverConfirm, setShowStartOverConfirm] = useState(false); // 🟢 Controls start over confirmation

  const handleWeekChange = (week) => {
    setCurrentWeek(week);
    setSelectedDay(null);
  };

  const handleOpenModal = (dayNumber) => setSelectedDay(dayNumber);
  const handleCloseModal = () => setSelectedDay(null);

  const handleToggleComplete = (dayNumber) => {
    setCompletedDays((prev) =>
      prev.includes(dayNumber)
        ? prev.filter((day) => day !== dayNumber)
        : [...prev, dayNumber]
    );
  };

  const getCurrentWeekMeals = () =>
    customMealPlans[currentWeek] || mealPlans[currentWeek] || {};

  const getCompletedCountForWeek = () => {
    const currentWeekDays = Object.keys(getCurrentWeekMeals()).map(Number);
    return completedDays.filter((day) => currentWeekDays.includes(day)).length;
  };

  // 🔄 Helper function to shuffle arrays and avoid consecutive duplicates
  const shuffleArrayNoConsecutiveDupes = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    for (let i = 1; i < arr.length; i++) {
      if (JSON.stringify(arr[i]) === JSON.stringify(arr[i - 1])) {
        for (let j = i + 1; j < arr.length; j++) {
          if (JSON.stringify(arr[j]) !== JSON.stringify(arr[i - 1])) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            break;
          }
        }
      }
    }
    return arr;
  };

  // 🔁 Shuffles meals across both weeks
  const handleShuffleMeals = () => {
    setShowConfirmShuffle(false);
    setIsLoading(true);
    const start = Date.now();

    const doShuffle = () => {
      const weeks = [1, 2];
      const allDays = [];

      weeks.forEach((weekNum) => {
        const weekMeals = customMealPlans[weekNum] || mealPlans[weekNum];
        Object.entries(weekMeals).forEach(([dayKey, meals]) => {
          allDays.push({ week: weekNum, day: dayKey, ...meals });
        });
      });

      // 🔄 Shuffle each meal type independently
      const breakfasts = shuffleArrayNoConsecutiveDupes(
        allDays.map((d) => d.breakfast)
      );
      const lunches = shuffleArrayNoConsecutiveDupes(
        allDays.map((d) => d.lunch)
      );
      const snacks = shuffleArrayNoConsecutiveDupes(
        allDays.map((d) => d.snack)
      );
      const dinners = shuffleArrayNoConsecutiveDupes(
        allDays.map((d) => d.dinner)
      );

      const newMeals = {};
      allDays.forEach((_, i) => {
        const { week, day } = allDays[i];
        if (!newMeals[week]) newMeals[week] = {};
        newMeals[week][day] = {
          breakfast: breakfasts[i],
          lunch: lunches[i],
          snack: snacks[i],
          dinner: dinners[i],
        };
      });

      // 💾 Save previous state for undo and apply new shuffled state
      setLastMealPlans({ ...customMealPlans });
      setCustomMealPlans((prev) => ({
        ...prev,
        1: newMeals[1],
        2: newMeals[2],
      }));

      // 🕒 Ensure loading spinner is visible for at least 3 seconds
      const duration = Date.now() - start;
      const delay = Math.max(3000 - duration, 0);
      setTimeout(() => setIsLoading(false), delay);
    };

    setTimeout(doShuffle, 500);
  };

  // ↩️ Undo the last shuffle
  const handleUndoShuffle = () => {
    if (lastMealPlans) {
      setIsLoading(true);
      const start = Date.now();
      const doUndo = () => {
        setCustomMealPlans(lastMealPlans);
        setLastMealPlans(null);
        const duration = Date.now() - start;
        const delay = Math.max(3000 - duration, 0);
        setTimeout(() => setIsLoading(false), delay);
      };
      setTimeout(doUndo, 500);
    }
  };

  const handleStartOver = () => {
    setIsLoading(true); // Show loading spinner
    const start = Date.now();

    const doStartOver = () => {
      // 1. Clear completed days
      setCompletedDays([]);

      // 2. Clear custom meal plans (localStorage will be updated by useLocalStorage hook)
      // Setting to an empty object. handleShuffleMeals will then use base mealPlans.
      setCustomMealPlans({});
      setLastMealPlans(null); // Also clear undo history for shuffled plans

      // 3. Reset start date to today
      setStartDate(new Date().toISOString().split("T")[0]);

      // 4. Regenerate and save a new meal plan
      // handleShuffleMeals already saves to localStorage and updates customMealPlans state
      // It needs to be slightly adjusted or called in a way that it re-initializes if customMealPlans is empty.
      // The current handleShuffleMeals should work as it checks:
      // const weekMeals = customMealPlans[weekNum] || mealPlans[weekNum];
      // So if customMealPlans is {}, it will use mealPlans.

      // Call a modified or direct shuffle that initializes from mealPlans
      const weeks = [1, 2];
      const allBaseDays = [];
      weeks.forEach((weekNum) => {
        const weekBaseMeals = mealPlans[weekNum]; // Explicitly use base meal plan
        Object.entries(weekBaseMeals).forEach(([dayKey, meals]) => {
          allBaseDays.push({ week: weekNum, day: dayKey, ...meals });
        });
      });

      const breakfasts = shuffleArrayNoConsecutiveDupes(
        allBaseDays.map((d) => d.breakfast)
      );
      const lunches = shuffleArrayNoConsecutiveDupes(
        allBaseDays.map((d) => d.lunch)
      );
      const snacks = shuffleArrayNoConsecutiveDupes(
        allBaseDays.map((d) => d.snack)
      );
      const dinners = shuffleArrayNoConsecutiveDupes(
        allBaseDays.map((d) => d.dinner)
      );

      const newInitialMeals = {};
      allBaseDays.forEach((_, i) => {
        const { week, day } = allBaseDays[i];
        if (!newInitialMeals[week]) newInitialMeals[week] = {};
        newInitialMeals[week][day] = {
          breakfast: breakfasts[i],
          lunch: lunches[i],
          snack: snacks[i],
          dinner: dinners[i],
        };
      });
      setCustomMealPlans({ 1: newInitialMeals[1], 2: newInitialMeals[2] });


      // 5. Reset UI state
      setShowStartOverConfirm(false);
      setCurrentWeek(1); // Go back to week 1

      // Ensure loading spinner is visible for at least a bit
      const duration = Date.now() - start;
      const delay = Math.max(1500 - duration, 0); // Shorter delay than full shuffle
      setTimeout(() => setIsLoading(false), delay);
    };

    setTimeout(doStartOver, 250); // Short delay before starting the process
  };

  const currentWeekMeals = getCurrentWeekMeals();
  const completedThisWeek = getCompletedCountForWeek();
  const totalDaysInWeek = Object.keys(currentWeekMeals).length;
  const selectedDayData = selectedDay ? currentWeekMeals[selectedDay] : null;
  const selectedDayDate = selectedDay
    ? getDateForDay(startDate, selectedDay)
    : null;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Layout>
        <div
          style={{
            position: "relative",
            padding: "2rem",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* ⚠️ Confirmation modal before shuffle */}
          {showConfirmShuffle && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.6)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
              }}
            >
              <div
                style={{
                  background: "#020617",
                  borderRadius: "12px",
                  border: "0.1rem solid white",
                  padding: "2rem",
                  width: "90%",
                  maxWidth: "400px",
                  textAlign: "center",
                }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-heading"
                aria-describedby="confirm-desc"
              >
                <h3 id="confirm-heading" style={{ marginBottom: "1rem" }}>
                  This will randomize your current meal plan.
                </h3>
                <p
                  id="confirm-desc"
                  style={{ marginBottom: "1.5rem", color: "#bbb" }}
                >
                  Continue?
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={handleShuffleMeals}
                    aria-label="Confirm shuffle meals"
                  >
                    Yes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowConfirmShuffle(false)}
                    aria-label="Cancel meal shuffle"
                  >
                    No
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* ⚠️ Confirmation modal for START OVER */}
          {showStartOverConfirm && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.7)", // Darker overlay
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 10000, // Ensure it's on top
              }}
            >
              <div
                style={{
                  background: "#1e293b", // Darker blue-gray
                  borderRadius: "12px",
                  border: "1px solid #f97316", // Orange border for warning
                  padding: "2rem",
                  width: "90%",
                  maxWidth: "420px",
                  textAlign: "center",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="startover-confirm-heading"
                aria-describedby="startover-confirm-desc"
              >
                <h3
                  id="startover-confirm-heading"
                  style={{ marginBottom: "1rem", color: "#f97316", fontSize: "1.5rem" }}
                >
                  Restart Your 14-Day Plan?
                </h3>
                <p
                  id="startover-confirm-desc"
                  style={{ marginBottom: "1.5rem", color: "#cbd5e1", fontSize: "1rem" }}
                >
                  This will clear all your completed days and generate a fresh
                  14-day meal plan. Your current progress will be lost.
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="contained" // Or a specific "danger" variant if available
                    onClick={() => handleStartOver()} // This function will be created next
                    aria-label="Confirm start over"
                    style={{ backgroundColor: "#f97316", color: "white" }}
                  >
                    Yes, Start Over
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowStartOverConfirm(false)}
                    aria-label="Cancel start over"
                  >
                    No, Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* 🔘 Top controls (shuffle, undo) */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
            >
              <WeekToggle
                currentWeek={currentWeek}
                onWeekChange={handleWeekChange}
              />
              <div style={{ color: "white", fontSize: "0.875rem" }}>
                <div style={{ color: "#94a3b8" }}>
                  Week {currentWeek} Progress
                </div>
                <div style={{ fontWeight: "600" }}>
                  {completedThisWeek}/{totalDaysInWeek} days completed
                </div>
              </div>
            </div>
            <div
              style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
            >
              <Button
                variant="outline"
                onClick={() => setShowShoppingList(true)}
              >
                🛒 Shopping List
              </Button>
              <Button variant="secondary">📅 Print Plan</Button>
              <Button
                variant="contained"
                onClick={() => setShowConfirmShuffle(true)}
                aria-label="Shuffle meal plan"
              >
                 Shuffle Meals
              </Button>
                {completedDays.length >= 14 && (
                  <Button
                    variant="warning" // Assuming a 'warning' or similar variant exists or can be added
                    onClick={() => setShowStartOverConfirm(true)}
                    aria-label="Start over meal plan"
                  >
                    🎉 Start Over
                  </Button>
                )}
              {lastMealPlans && (
                <Button
                  variant="outline"
                  onClick={handleUndoShuffle}
                  aria-label="Undo last shuffle"
                >
                  ↩️ Undo
                </Button>
              )}
            </div>
          </div>

          {/* ⏳ Loading spinner during shuffle/undo */}
          {isLoading ? (
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  border: "4px solid #22c55e",
                  borderTopColor: "transparent",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  margin: "auto",
                }}
                role="status"
                aria-label="Loading spinner"
              />
              <div style={{ color: "#22c55e", marginTop: "1rem" }}>
                Please wait...
              </div>
              <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : (
            <>
              {/* Meal Plan Grid with DatePicker as first item */}
              <div
                style={{
                  display: "grid",
                  gap: "1.5rem",
                  gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
                }}
              >
                <DatePicker
                  startDate={startDate}
                  onStartDateChange={setStartDate}
                />
                {Object.entries(currentWeekMeals).map(([dayIndex, meals]) => {
                  const dayNumber = parseInt(dayIndex);
                  const dayDate = getDateForDay(startDate, dayNumber);
                  return (
                    <DayCard
                      key={dayIndex}
                      dayNumber={dayNumber}
                      meals={meals}
                      isCompleted={completedDays.includes(dayNumber)}
                      onOpenModal={handleOpenModal}
                      onToggleComplete={handleToggleComplete}
                      date={dayDate}
                    />
                  );
                })}
              </div>
            </>
          )}

          {/* 📅 Day detail modal */}
          <DayModal
            isOpen={!!selectedDay}
            onClose={handleCloseModal}
            dayNumber={selectedDay}
            meals={selectedDayData}
            date={selectedDayDate}
            isCompleted={
              selectedDay ? completedDays.includes(selectedDay) : false
            }
            onToggleComplete={handleToggleComplete}
          />

          {/* 🛍️ Shopping list modal */}
          <ShoppingList
            isOpen={showShoppingList}
            onClose={() => setShowShoppingList(false)}
          />
        </div>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
