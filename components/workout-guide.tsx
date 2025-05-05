"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"

interface Exercise {
  name: string
  sets: string
  reps: string
  youtubeLink: string
}

interface WorkoutDay {
  day: string
  focus: string
  exercises: Exercise[]
}

const workoutData: WorkoutDay[] = [
  {
    day: "Monday",
    focus: "Chest & Triceps",
    exercises: [
      {
        name: "Bench Press",
        sets: "4",
        reps: "8-10",
        youtubeLink: "https://www.youtube.com/watch?v=rT7DgCr-3pg",
      },
      {
        name: "Incline Dumbbell Press",
        sets: "3",
        reps: "10-12",
        youtubeLink: "https://www.youtube.com/watch?v=0G2_XV7slIg",
      },
      {
        name: "Cable Flyes",
        sets: "3",
        reps: "12-15",
        youtubeLink: "https://www.youtube.com/watch?v=Iwe6AmxVf7o",
      },
      {
        name: "Tricep Pushdowns",
        sets: "3",
        reps: "12-15",
        youtubeLink: "https://www.youtube.com/watch?v=2-LAMcpzODU",
      },
      {
        name: "Overhead Tricep Extension",
        sets: "3",
        reps: "10-12",
        youtubeLink: "https://www.youtube.com/watch?v=_gsUck-7M74",
      },
    ],
  },
  {
    day: "Tuesday",
    focus: "Back & Biceps",
    exercises: [
      {
        name: "Pull-Ups",
        sets: "4",
        reps: "8-10",
        youtubeLink: "https://www.youtube.com/watch?v=eGo4IYlbE5g",
      },
      {
        name: "Bent Over Rows",
        sets: "3",
        reps: "10-12",
        youtubeLink: "https://www.youtube.com/watch?v=9efgcAjQe7E",
      },
      {
        name: "Lat Pulldowns",
        sets: "3",
        reps: "12-15",
        youtubeLink: "https://www.youtube.com/watch?v=CAwf7n6Luuc",
      },
      {
        name: "Barbell Curls",
        sets: "3",
        reps: "10-12",
        youtubeLink: "https://www.youtube.com/watch?v=kwG2ipFRgfo",
      },
      {
        name: "Hammer Curls",
        sets: "3",
        reps: "12-15",
        youtubeLink: "https://www.youtube.com/watch?v=zC3nLlEvin4",
      },
    ],
  },
  {
    day: "Wednesday",
    focus: "Legs",
    exercises: [
      {
        name: "Squats",
        sets: "4",
        reps: "8-10",
        youtubeLink: "https://www.youtube.com/watch?v=ultWZbUMPL8",
      },
      {
        name: "Romanian Deadlifts",
        sets: "3",
        reps: "10-12",
        youtubeLink: "https://www.youtube.com/watch?v=jEy_czb3RKA",
      },
      {
        name: "Leg Press",
        sets: "3",
        reps: "12-15",
        youtubeLink: "https://www.youtube.com/watch?v=IZxyjW7MPJQ",
      },
      {
        name: "Leg Extensions",
        sets: "3",
        reps: "12-15",
        youtubeLink: "https://www.youtube.com/watch?v=YyvSfVjQeL0",
      },
      {
        name: "Calf Raises",
        sets: "4",
        reps: "15-20",
        youtubeLink: "https://www.youtube.com/watch?v=-M4-G8p8fmc",
      },
    ],
  },
  {
    day: "Thursday",
    focus: "Shoulders & Abs",
    exercises: [
      {
        name: "Overhead Press",
        sets: "4",
        reps: "8-10",
        youtubeLink: "https://www.youtube.com/watch?v=2yjwXTZQDDI",
      },
      {
        name: "Lateral Raises",
        sets: "3",
        reps: "12-15",
        youtubeLink: "https://www.youtube.com/watch?v=3VcKaXpzqRo",
      },
      {
        name: "Face Pulls",
        sets: "3",
        reps: "12-15",
        youtubeLink: "https://www.youtube.com/watch?v=eIq5CB9JfKE",
      },
      {
        name: "Hanging Leg Raises",
        sets: "3",
        reps: "12-15",
        youtubeLink: "https://www.youtube.com/watch?v=Pr1ieGZ5atk",
      },
      {
        name: "Russian Twists",
        sets: "3",
        reps: "20 (10 each side)",
        youtubeLink: "https://www.youtube.com/watch?v=wkD8rjkodUI",
      },
    ],
  },
  {
    day: "Friday",
    focus: "Full Body",
    exercises: [
      {
        name: "Deadlifts",
        sets: "4",
        reps: "6-8",
        youtubeLink: "https://www.youtube.com/watch?v=r4MzxtBKyNE",
      },
      {
        name: "Push-Ups",
        sets: "3",
        reps: "15-20",
        youtubeLink: "https://www.youtube.com/watch?v=IODxDxX7oi4",
      },
      {
        name: "Dumbbell Rows",
        sets: "3",
        reps: "10-12",
        youtubeLink: "https://www.youtube.com/watch?v=roCP6wCXPqo",
      },
      {
        name: "Lunges",
        sets: "3",
        reps: "12 (6 each leg)",
        youtubeLink: "https://www.youtube.com/watch?v=QOVaHwm-Q6U",
      },
      {
        name: "Plank",
        sets: "3",
        reps: "30-60 seconds",
        youtubeLink: "https://www.youtube.com/watch?v=pSHjTRCQxIw",
      },
    ],
  },
  {
    day: "Saturday & Sunday",
    focus: "Rest & Recovery",
    exercises: [
      {
        name: "Light Cardio (Optional)",
        sets: "1",
        reps: "20-30 minutes",
        youtubeLink: "https://www.youtube.com/watch?v=PvEnWsPrL4w",
      },
      {
        name: "Stretching",
        sets: "1",
        reps: "15-20 minutes",
        youtubeLink: "https://www.youtube.com/watch?v=sTxC3J3gQEU",
      },
    ],
  },
]

export default function WorkoutGuide() {
  const [openDays, setOpenDays] = useState<string[]>([])

  const toggleDay = (day: string) => {
    if (openDays.includes(day)) {
      setOpenDays(openDays.filter((d) => d !== day))
    } else {
      setOpenDays([...openDays, day])
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {workoutData.map((workout) => (
        <div key={workout.day} className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
          <div
            className="flex justify-between items-center p-4 bg-white cursor-pointer hover:bg-gray-50"
            onClick={() => toggleDay(workout.day)}
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{workout.day}</h3>
              <p className="text-gray-600">{workout.focus}</p>
            </div>
            <div>
              {openDays.includes(workout.day) ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </div>

          {openDays.includes(workout.day) && (
            <div className="p-4 bg-gray-50">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Exercise
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Sets
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Reps
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Demo
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {workout.exercises.map((exercise, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {exercise.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exercise.sets}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exercise.reps}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <a
                            href={exercise.youtubeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            Watch <ExternalLink className="ml-1 h-4 w-4" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
