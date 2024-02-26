#+ Node Mapper
#+ This shiney app is a form that allows users to 
#+ fill out a form to have their node mapped and then
#+ view the results on a map.
#+ 
#+ The form will ask for the following information:
#+ 1. Name of person
#+ 2. Latitude
#+ 3. Longitude
#+ 4. Date
#+ 5. Status
#+    5a. Active
#+    5b. Inactive
#+      5b1. Maintenance
#+      5b2. Decommissioned
#+      5b3. Prospective
#+      
#+ The map will show the location of the node and the status
#+ as a marker on the map. The marker will be color coded to
#+ show the status of the node.


library(shiny)

# Define UI for application that draws a histogram
ui <- fluidPage(

    # Application title
    titlePanel("Boston Meshnet Form"),
    
    # Sidebar with a 

)

# Define server logic required to draw a histogram
server <- function(input, output) {

    output$distPlot <- renderPlot({
        # generate bins based on input$bins from ui.R
        x    <- faithful[, 2]
        bins <- seq(min(x), max(x), length.out = input$bins + 1)

        # draw the histogram with the specified number of bins
        hist(x, breaks = bins, col = 'darkgray', border = 'white',
             xlab = 'Waiting time to next eruption (in mins)',
             main = 'Histogram of waiting times')
    })
}

# Run the application 
shinyApp(ui = ui, server = server)
