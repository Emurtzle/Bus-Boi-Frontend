function AboutPage({ setShowAboutPage }: AboutPageProps) {
  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      {/* Content */}
      <div className="relative w-3/5 h-4/5 my-6 mx-auto">
        {/* Content */}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/* Header */}
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-3xl font-semibold">About</h3>
          </div>
          {/* Body */}
          <div className="relative p-6 flex-auto">
            <div className="flex flex-col w-full h-full">
              <p>
                <strong>This is not a trip planner,</strong> this is proof of concept of a way to quickly track what the
                next bus is for specefied route for a specefied stop. This currently only works with bus transit around
                Seattle.
              </p>
              <p>
                <strong>Author:</strong> Emily Wagner
              </p>
              <p>
                <strong>Frontend:</strong> React, TailwindCSS, React-Query, React-Leaflet, Leaflet, CRA, Moment,
                Moment-Duration-Format, TypeScript, Graphql-Request
              </p>
              <p>
                <strong>Backend:</strong> Graphql, Hot Chocolate, Automapper, Entity Framework, Json.net
              </p>
              <p>
                <strong>Database:</strong> Microsoft SQL Server
              </p>
              <p>
                <strong>APIs:</strong> Sound Transit One Bus Away API
              </p>
              <p>
                <strong>Hosted On:</strong> Azure
              </p>
            </div>
            <p>
              <strong>TODO Next:</strong>
            </p>
            <ol className=" list-decimal ml-6">
              <li>
                Overhaul CSS for bus and bus stop map markers to be show more information, and be more clear and
                informative.
              </li>
              <li>
                <p>Multiple Methods of saving the watched stop list and user configs (basically user state).</p>
                <ol className="list-decimal ml-6">
                  <li>Via generated URL</li>
                  <li>Via account registration</li>
                  <li>Via Local Storage</li>
                </ol>
              </li>
              <li>Get mobile rendering working correctly.</li>
              <li>Add more cities</li>
              <li>Optimistic updates</li>
            </ol>
          </div>
          {/* Footer */}
          <div className="flex items-center justify-end p-6 space-x-2">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-3 mr-1 mb-1 text-sm border hover:text-white border-red-500 rounded shadow hover:shadow-lg hover:bg-red-500 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowAboutPage(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type AboutPageProps = {
  setShowAboutPage: (toggle: boolean) => void;
};

export default AboutPage;
