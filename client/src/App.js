import React from "react";
import "@elastic/eui/dist/eui_theme_light.css";
import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";

import moment from "moment";

import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  WithSearch,
  Paging,
} from "@elastic/react-search-ui";
import {
  Layout,
} from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import CustomResultCard from "./CustomResultCard";

const connector = new ElasticsearchAPIConnector({
  host: "http://localhost:9200",
  index: "planecrash"
});

const config = {
  debug: true,
  alwaysSearchOnInitialLoad: true,
  apiConnector: connector,
  hasA11yNotifications: true,
  searchQuery: {
    result_fields: {
      date: {raw: {}},
      time: {raw: {}},
      location: {raw: {}},
      operator: {raw: {}},
      route: {raw: {}},
      ac: {raw: {}},
      registration: {raw: {}},
      aboard: {raw: {}},
      fatalities: {raw: {}},
      ground: {raw: {}},
      summary: {
        snippet: {
          size: 100,
          fallback: true
        }
      }
    },
    // disjunctiveFacets: ["acres", "states", "date_established", "location"],
    facets: {
      aboard: {
        type: "range",
        ranges: [
          {from: 0, to: 50, name: "From 0 to 50"},
          {from: 51, to: 100, name: "From 51 to 100"},
          {from: 101, name: "More than 101"}
        ]
      },
      fatalities: {
        type: "range",
        ranges: [
          {from: 0, to: 50, name: "From 0 to 50"},
          {from: 51, to: 100, name: "From 51 to 100"},
          {from: 101, name: "More than 101"}
        ]
      },
      date: {
        type: "range",
        ranges: [
          {
            from: moment().subtract(50, "years").toISOString(),
            name: "Less than 50 years ago"
          },
          {
            from: moment().subtract(100, "years").toISOString(),
            to: moment().subtract(50, "years").toISOString(),
            name: "Between 50 and 100 years ago"
          },
          {
            to: moment().subtract(100, "years").toISOString(),
            name: "More than 100 years ago"
          }
        ]
      }
    }
  },
};

const SORT_OPTIONS = [
  {
    name: "Relevance",
    value: []
  },
  {
    name: "Title",
    value: [
      {
        field: "title",
        direction: "asc"
      }
    ]
  },
  {
    name: "State",
    value: [
      {
        field: "states",
        direction: "asc"
      }
    ]
  },
  {
    name: "State -> Title",
    value: [
      {
        field: "states",
        direction: "asc"
      },
      {
        field: "title",
        direction: "asc"
      }
    ]
  },
  {
    name: "Heritage Site -> State -> Title",
    value: [
      {
        field: "world_heritage_site",
        direction: "asc"
      },
      {
        field: "states",
        direction: "asc"
      },
      {
        field: "title",
        direction: "asc"
      }
    ]
  }
];

export default function App() {
  return (
    <SearchProvider config={config}>
      <WithSearch
        mapContextToProps={({wasSearched}) => ({
          wasSearched
        })}
      >
        {({wasSearched}) => {
          return (
            <div className="App">
              <ErrorBoundary>
                <Layout
                  header={
                    <SearchBox
                      // Set debounceLength and searchAsYouType props
                      debounceLength={300}
                      searchAsYouType={true}
                    />
                  }
                  sideContent={
                    <div>
                      {/* {wasSearched && (
                        <Sorting label={"Sort by"} sortOptions={SORT_OPTIONS} />
                      )} */}
                      <Facet
                        key="0"
                        field="aboard"
                        label="Aboard"
                        filterType="any"
                      />
                      <Facet
                        key="1"
                        field="fatalities"
                        label="Fatalities"
                        filterType="any"
                      />
                      <Facet
                        key="2"
                        field="date"
                        label="Date"
                        filterType="any"
                      />
                    </div>
                  }
                  bodyContent={
                    <Results
                      resultView={CustomResultCard}
                    />
                  }
                  bodyFooter={<Paging />}
                // bodyHeader={
                //   <React.Fragment>
                //     {wasSearched && <PagingInfo />}
                //     {wasSearched && <ResultsPerPage />}
                //   </React.Fragment>
                // }
                // bodyFooter={<Paging />}
                />
              </ErrorBoundary>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
}
