import Layout from '../components/layout'

export default function FAQ() {
  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">What should I bring to a training session?</h2>
          <p>Comfortable workout clothes, water, and any personal protective gear you prefer.</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">How long are the training sessions?</h2>
          <p>Typical sessions last 60-90 minutes, but can be adjusted based on your needs and goals.</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Do you offer group training?</h2>
          <p>Yes, I offer both individual and small group training sessions. Contact me for more details.</p>
        </div>
      </div>
    </Layout>
  )
}

