import Container from '../components/Container';

export default function Home() {
  return (
    <Container>
      <div className="flex flex-col justify-center items-start w-full max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-0 sm:pb-8">
        <div className="flex flex-col justify-between w-full h-72 rounded-lg bg-[url('/jonathan.jpg')] bg-cover bg-center" />
        <h2 className="font-medium text-3xl tracking-tight pt-5 text-black dark:text-white">
          About
        </h2>
        <div className="grid grid-cols-1 gap-0 sm:gap-6 sm:grid-cols-2">
          <p className="mb-3 text-justify font-light text-md tracking-tight text-gray-500 dark:text-gray-400">
            I'm a first-year PhD student in Information Science at{' '}
            <a
              href="https://infosci.cornell.edu/content/segal"
              className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-700"
            >
              Cornell University
            </a>
            , where I'm advised by{' '}
            <a
              href="https://cals.cornell.edu/andrea-stevenson-won"
              className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-700"
            >
              Andrea Stevenson Won
            </a>
            . I am a part of the{' '}
            <a
              href="https://virtualembodimentlab.com/"
              className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-700"
            >
              Virtual Embodiment Lab
            </a>
            , where I have been exploring behavior and perception in virtual
            environments. My research interests lie at the intersection of
            Human-Computer Interaction, Computer-Supported Cooperative Work, and
            Virtual/Mixed Reality. I'm excited about the potential for new,
            undiscovered uses of AR/VR. Recently I have been investigating
            nonverbal synchrony and transformative social interaction.
          </p>
          <p className="mb-3 text-md text-justify font-light tracking-tight text-gray-500 dark:text-gray-400">
            Prior to joining Cornell, I've worked as a Research Assistant at{' '}
            <a
              href="https://www.iastate.edu/"
              className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-700"
            >
              Iowa State University
            </a>{' '}
            in the{' '}
            <a
              href="https://cals.cornell.edu/andrea-stevenson-won"
              className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-700"
            >
              Virtual Reality Applications Center
            </a>
            , with{' '}
            <a
              href="https://www.imse.iastate.edu/directory/profile/gilbert/"
              className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-700"
            >
              Stephen Gilbert
            </a>{' '}
            and{' '}
            <a
              href="https://www.imse.iastate.edu/dorneich/"
              className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-700"
            >
              Michael Dorneich
            </a>
            . There, I developed a testbed to assess teaming behaviors and
            explore human agent teams in virtual environments. I have also done
            research at the{' '}
            <a
              href="https://www6.slac.stanford.edu/"
              className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-700"
            >
              SLAC National Accelerator Laboratory
            </a>{' '}
            where I worked with{' '}
            <a
              href="https://sites.google.com/view/jeffshrager-org/home"
              className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-700"
            >
              Jeff Shrager
            </a>{' '}
            and{' '}
            <a
              href="https://profiles.stanford.edu/wan-lin-hu"
              className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-700"
            >
              Wan-Lin Hu
            </a>
            . I have also had internships at{' '}
            <a
              href="https://www.blackrock.com/aladdin"
              className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-700"
            >
              BlackRock
            </a>
            ,{' '}
            <a
              href="https://www.dwolla.com/updates/my-crazy-summer-internship/?utm_campaign=Ongoing-Social&utm_content=136222797&utm_medium=social&utm_source=twitter&hss_channel=tw-84909450"
              className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-700"
            >
              Dwolla
            </a>
            , and{' '}
            <a
              href="https://www.corteva.com/"
              className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-700"
            >
              Corteva
            </a>
            . I am always interested in talking about interesting ideas or
            projects, so feel free to reach out!
          </p>
        </div>
      </div>
    </Container>
  );
}
