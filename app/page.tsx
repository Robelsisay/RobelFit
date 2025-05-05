import Navbar from "@/components/navbar"
import WorkoutGuide from "@/components/workout-guide"
import ContactForm from "@/components/contact-form"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen gym-background">
      <Navbar />

      <section id="home" className="pt-20 pb-10 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="content-section">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Weekly Workout Split Guide</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Follow our professionally designed workout split to maximize your gains and achieve your fitness goals.
            </p>
          </div>

          <WorkoutGuide />
        </div>
      </section>

      <section id="contact" className="py-16 px-4 md:px-8 lg:px-16">
        <div className="content-section">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Get In Touch</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Have questions about the workout plan? Need personalized advice? Send us a message!
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
