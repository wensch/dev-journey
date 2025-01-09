
interface IContent {
  title?: string,
  subtitle?: string,
  contents?: {
    title: string,
    text?: string
  }[],
  endText?: string,
}
const Content = ({
  title,
  subtitle,
  contents,
  endText
}: IContent) => {
  return (
    <section className="px-6 py-8 bg-primaryDark  rounded-lg shadow-md">
          {title && <h1 className="text-3xl font-bold text-center mb-6 text-accent">{title}</h1>}
          {subtitle && <p className="text-lg leading-7 text-secondary mb-8">{subtitle}</p>}

          {contents && <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contents.map((content, index) => (
              <div key={index}>
                <h2 className="text-2xl font-semibold text-accent mb-2">{content.title}</h2>
                <p className="text-secondary leading-6">{content.text}</p>
              </div>
            ))}
          </div>}

          {endText && <p className="text-lg text-center font-medium text-secondary mt-8">{endText}</p>}
          
        </section>
  )
}

export default Content