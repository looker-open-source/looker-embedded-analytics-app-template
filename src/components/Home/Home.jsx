import React from 'react';
import Tile from '../Tile/Tile';
import architecture from '../../assets/images/architecture.png'
import { Link, useLocation } from 'react-router-dom'

const Home = () => {
  const features = [
    {
      title: "Simple Dashboard",
      subtitle: "Basic dashboard embedding",
      description: "Basic embedding a Looker dashboard, using createDashboardWithId method of the Looker Embed SDK",
      path: "/simple-dashboard",
      icon: () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "Advanced Dashboard",
      subtitle: "Interactive filtering",
      description: "Embedding a Looker dashboard, adding an interactive, native filter able to send/receive Javascript events from the iframe",
      path: "/advanced-dashboard",
      icon: () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
    },
    {
      title: "Native Dashboard",
      subtitle: "Custom Chartjs integration",
      description: "Custom Charts.js graphs displaying data retrieve through the Looker SDK",
      path: "/native-dashboard",
      icon: () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Self Service",
      subtitle: "Embedded Exploration",
      description: "Simple embedding of a Looker explore, using createExploreWithId",
      path: "/explore",
      icon: () => (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="">
      <div className="overflow-x-auto overflow-y-scroll h-full w-full no-scrollbar">
        <div className="flex flex-col gap-6 p-4 max-w-10xl mx-auto">
          {/* Introduction Tile */}
          {/* <Tile> */}
          <div className="relative overflow-hidden">
            {/* Background with multiple gradients for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50" />
            
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl -ml-20 -mb-20" />
    
              {/* Content */}
              <div className="relative z-10 p-8">
                <div className="max-w-3xl">
                  <h1 className="text-4xl font-bold text-white mb-2">
                    Embedded Analytics App Template
                  </h1>
                  <p className="text-xl text-blue-100 mb-8">
                    A Modern React & Node Implementation Example
                  </p>
                  
                  <p className="text-gray-200 leading-relaxed mb-6 text-lg">
                    The goal of this repository is to showcase how to implement a simple Embedded Analytics application powered by Looker, 
                    using the Looker the Looker API, Embed SDK, and various other capabilities of the Looker platform. The app is able to display data from a Looker instance
                    using two different methods:
                  </p>
                  
                  <ul className="space-y-4 text-gray-200">
                    <li className="flex items-start space-x-3">
                      <div className="mt-1.5 flex-shrink-0">
                        <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="leading-relaxed">
                        Embedding a looker dashboard using{' '}
                        <a className="text-blue-400 hover:text-blue-300 underline font-medium" 
                          href="https://cloud.devsite.corp.google.com/looker/docs/embed-sdk"
                          traget="_blank"
                        >
                          Looker Embed SDK
                        </a>
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="mt-1.5 flex-shrink-0">
                        <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="leading-relaxed">
                        Using{' '}
                        <a className="text-blue-400 hover:text-blue-300 underline font-medium" 
                          href="https://cloud.devsite.corp.google.com/looker/docs/api-sdk"
                          target="_blank"
                        >
                          Looker SDK
                        </a>{' '}
                        to send custom queries to your Looker instance, and display results using custom visualizations
                      </span>
                    </li>
                  </ul>
                  
                  {/* Optional: Add call-to-action buttons */}
                  <div className="mt-8 flex space-x-4">
                    <Link to={"/simple-dashboard"}>
                    <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                      Get Started
                    </button>
                    </Link>
                    <button className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors" onClick={(e) => window.open('https://github.com/looker-open-source/looker-embedded-analytics-app-template', '_blank')}>
                      View Docs
                    </button>
                  </div>
                </div>
              </div>
            </div>
          {/* </Tile> */}

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <Link to={feature.path}>
              <Tile key={index} className="transition-all duration-300 hover:shadow-lg">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {feature.icon()}
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold">{feature.title}</h2>
                  <p className="mt-1 text-sm text-blue-500">{feature.subtitle}</p>
                  <p className="mt-3 text-gray-200 leading-relaxed text-sm">{feature.description}</p>
                </div>
              </Tile>
              </Link>
            ))}
          </div>

          {/* Architecture Section */}
          <Tile>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Architecture</h2>
              <p className="text-gray-200 leading-relaxed">The app is split into 2 main components:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-200 leading-relaxed">
                <li>A React frontend, depending on both Looker SDKs.</li>
                <li>A Node.js backend, serving the front-end and handling authentication requests to Looker.</li>
              </ul>
              <p className="text-gray-200 leading-relaxed">The architecture is shown in the following picture:</p>
              <div className="my-8">
                <img className="w-[50%]" src={architecture} alt="Architecture diagram" />
              </div>
            </div>
          </Tile>

          {/* Frontend Section */}
          <Tile>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Front-end</h2>
              <p className="text-gray-200 leading-relaxed">
                By default, the front-end is authenticated using Google Sign In. The /login page displays both 
                the Sign In button and the Google One Tap prompt. For example purposes, this authentication is 
                local to the browser.
              </p>
              <p className="text-gray-200 leading-relaxed">
                Once logged in, the front-end is able to use the Looker Embed SDK to embed a Looker dashboard 
                (or an explore, or custom view, etc.). The embed SDK is initialized with the URL of the Looker 
                instance, and the backend routes to call to obtain the necessary access token for embedding.
              </p>
            </div>
          </Tile>

          {/* Backend Section */}
          <Tile>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Back-end</h2>
              <p className="text-gray-200 leading-relaxed">
                The back-end holds the credentials (client_id and client_secret) to the Looker instance, as well 
                as the embed user configuration. It also depends on the Node version of the Looker SDK, to 
                facilitate all API calls.
              </p>
              <h3 className="text-xl font-semibold mt-6">User authentication & Security</h3>
              <p className="text-gray-200 leading-relaxed">
                All endpoints are un-authenticated in this sample implementation. By default, iframes embedded 
                with the Embed SDK will have the permissions of the hardcoded user.json embed user specification.
              </p>
            </div>
          </Tile>

          {/* Deployment Section */}
          <Tile>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Deployment</h2>
              <p className="text-gray-200 leading-relaxed">
                Automated deployments are out of the scope of this starter kit, but there are several ways of 
                deploying using Google Cloud:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-200 leading-relaxed">
                <li>
                  <span className="font-semibold">Google Cloud Storage / Cloud Run:</span> Cloud Storage can serve 
                  the static files of the React App, while a container of the back-end runs inside Cloud Run
                </li>
                <li>
                  <span className="font-semibold">Google App Engine:</span> also capable of serving the static files 
                  easily, while also managing basic load-balancing and scaling for the back-end
                </li>
                <li>
                  <span className="font-semibold">Google Kubernetes Engine:</span> will provide even more control on 
                  the deployment and its infrastructure, at the cost of more configuration
                </li>
              </ul>
            </div>
          </Tile>
        </div>
      </div>
    </div>
  );
};

export default Home;