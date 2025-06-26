import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import { Layout } from "./components/layout/Layout";
import { Button } from "./components/ui/Button";
import { WeekToggle } from "./components/dashboard/WeekToggle";
import { DatePicker } from "./components/dashboard/DatePicker";
import { DayCard } from "./components/dashboard/DayCard";
import { DayModal } from "./components/dashboard/DayModal"; // NEW IMPORT
import { ShoppingList } from "./components/dashboard/ShoppingList";
import { mealPlans } from "./data/mealPlans";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { getDateForDay } from "./utils/dateHelpers";

function App() {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState(null); // CHANGED: was expandedDay
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [completedDays, setCompletedDays] = useLocalStorage(
    "keto-completed-days",
    []
  );

  const [startDate, setStartDate] = useLocalStorage(
    "keto-start-date",
    new Date().toISOString().split("T")[0]
  );

  const handleWeekChange = (week) => {
    setCurrentWeek(week);
    setSelectedDay(null); // CHANGED: Close modal when switching weeks
  };

  const handleOpenModal = (dayNumber) => {
    // CHANGED: was handleToggleExpand
    setSelectedDay(dayNumber);
  };

  const handleCloseModal = () => {
    // NEW FUNCTION
    setSelectedDay(null);
  };

  const handleToggleComplete = (dayNumber) => {
    setCompletedDays((prev) => {
      if (prev.includes(dayNumber)) {
        return prev.filter((day) => day !== dayNumber);
      } else {
        return [...prev, dayNumber];
      }
    });
  };

  const getCurrentWeekMeals = () => {
    return mealPlans[currentWeek] || {};
  };

  const getCompletedCountForWeek = () => {
    const currentWeekDays = Object.keys(getCurrentWeekMeals()).map((day) =>
      parseInt(day)
    );
    return completedDays.filter((day) => currentWeekDays.includes(day)).length;
  };

  const currentWeekMeals = getCurrentWeekMeals();
  const completedThisWeek = getCompletedCountForWeek();
  const totalDaysInWeek = Object.keys(currentWeekMeals).length;

  // Get selected day data for modal
  const selectedDayData = selectedDay ? currentWeekMeals[selectedDay] : null;
  const selectedDayDate = selectedDay
    ? getDateForDay(startDate, selectedDay)
    : null;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Layout>
        <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
          {/* Controls Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "2rem",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <DatePicker
                startDate={startDate}
                onStartDateChange={setStartDate}
              />
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
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <Button
                variant="outline"
                onClick={() => setShowShoppingList(true)}
              >
                🛒 Shopping List
              </Button>
              <Button variant="secondary">📅 Print Plan</Button>
            </div>
          </div>

          {/* Meal Plan Grid */}
          <div
            style={{
              display: "grid",
              gap: "1.5rem",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            }}
          >
            {Object.entries(currentWeekMeals).map(([dayIndex, meals]) => {
              const dayNumber = parseInt(dayIndex);
              const dayDate = getDateForDay(startDate, dayNumber);

              return (
                <DayCard
                  key={dayIndex}
                  dayNumber={dayNumber}
                  meals={meals}
                  isCompleted={completedDays.includes(dayNumber)}
                  onOpenModal={handleOpenModal} // CHANGED: was onToggleExpand
                  onToggleComplete={handleToggleComplete}
                  date={dayDate}
                />
              );
            })}
          </div>

          {/* Day Detail Modal */}
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

          {/* Shopping List Modal */}
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
