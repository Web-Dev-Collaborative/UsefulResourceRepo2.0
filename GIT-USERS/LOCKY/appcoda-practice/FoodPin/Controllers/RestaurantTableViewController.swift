import UIKit
import CoreData

class RestaurantTableViewController: UITableViewController, NSFetchedResultsControllerDelegate, UISearchResultsUpdating {
//    @IBOutlet var mainTableView: UITableView!
    
    var restaurants:[Restaurant] = []
    var searchResults:[Restaurant] = []
    var fetchResultController:NSFetchedResultsController!
    var searchController: UISearchController!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // MARK - We can draw something in restaurantUIViewController Here.
        
        //let button = UIButton(type: UIButtonType.System) as UIButton
        //button.frame = CGRectMake(100, 100, 100, 50)
        //button.backgroundColor = UIColor.greenColor()
        //button.setTitle("Test Button", forState: UIControlState.Normal)
        //button.addTarget(self, action: "buttonAction:", forControlEvents: UIControlEvents.TouchUpInside)
        //self.view.addSubview(button)

        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem()
        
        // MARK - Remove the title of the back button
        navigationItem.backBarButtonItem = UIBarButtonItem(title: "", style:.Plain, target: nil, action: nil)
        
        // MARK - Laoding Data from CoreData
        let fetchRequest = NSFetchRequest(entityName: "Restaurant")
        let sortDescriptor = NSSortDescriptor(key: "name", ascending: true)
        fetchRequest.sortDescriptors = [sortDescriptor]
        
        if let managedObjectContext = (UIApplication.sharedApplication().delegate as? AppDelegate)?.managedObjectContext {
            fetchResultController = NSFetchedResultsController(fetchRequest:fetchRequest, managedObjectContext: managedObjectContext, sectionNameKeyPath:nil, cacheName: nil)
            fetchResultController.delegate = self
            do {
                try fetchResultController.performFetch()
                restaurants = fetchResultController.fetchedObjects as! [Restaurant]
            } catch {
                print(error)
            }
        }
        
        // MARK - self-sizing cell setting.
        self.tableView.estimatedRowHeight = 80.0
        self.tableView.rowHeight = UITableViewAutomaticDimension
        
        // MARK - add search Bar
        searchController = UISearchController(searchResultsController: nil)
        tableView.tableHeaderView = searchController.searchBar
        tableView.scrollToRowAtIndexPath(NSIndexPath(forRow: 0, inSection: 0), atScrollPosition: UITableViewScrollPosition.Top, animated: false)

        searchController.searchResultsUpdater = self
        searchController.dimsBackgroundDuringPresentation = false
    }
    
    @IBAction func unwindToHomeScreen(segue:UIStoryboardSegue) {
    
    }
    
    override func viewWillAppear(animated: Bool) {
        super.viewWillAppear(animated)
        navigationController?.hidesBarsOnSwipe = true
        
        let defaults = NSUserDefaults.standardUserDefaults()
        let hasViewedWalkthrough = defaults.boolForKey("hasViewedWalkthrough")
        
        if hasViewedWalkthrough {
            return
        }
        //MARK - Show page view
        if let pageViewController = storyboard?.instantiateViewControllerWithIdentifier("WalkthroughController") as?
            WalkthroughPageViewController {
                presentViewController(pageViewController, animated: true, completion: nil)
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }

    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 1
    }

    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if searchController.active {
            return searchResults.count
        } else {
            return restaurants.count
        }
    }
    
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cellIdentifier = "Cell"
        let cell = tableView.dequeueReusableCellWithIdentifier(cellIdentifier, forIndexPath: indexPath) as! RestaurantTableViewCell
        let restaurant = (searchController.active) ? searchResults[indexPath.row] : restaurants[indexPath.row]
        
        cell.nameLabel.text = restaurant.name
        cell.locationLabel.text = restaurant.location
        cell.typeLabel.text = restaurant.type
        
        cell.thumbnailImageView.image = UIImage(data: restaurants[indexPath.row].image!)
        cell.thumbnailImageView.layer.cornerRadius = 30.0
        cell.thumbnailImageView.clipsToBounds = true
        
        // MARK - create checkmark
        if let isVisited = self.restaurants[indexPath.row].isVisited?.boolValue {
            cell.accessoryType = isVisited ? .Checkmark : .None
        }
        
        return cell
    }

    //  MARK - This function will show action sheet
    
//    override func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
//        let optionMenu = UIAlertController(title: nil, message: "What do you want to do?", preferredStyle: .ActionSheet)
//        let cancelAction = UIAlertAction(title: "Cancel", style: .Cancel, handler:nil)
//        let callActionHandler =
//            {
//                (action: UIAlertAction!) -> Void in
//                let alertMessage = UIAlertController(title: "Service Unavailable", message:"Sorry, the call feature is not available yet. Please retry later.", preferredStyle: .Alert)
//                alertMessage.addAction(UIAlertAction(title: "OK", style: .Default, handler:nil))
//                self.presentViewController(alertMessage, animated: true, completion: nil)
//            }
//        
//        let callAction = UIAlertAction(title: "Call " + "123-000-\(indexPath.row)", style: .Default, handler: callActionHandler)
//        
//        let isVisitedAction = UIAlertAction(title: "I've been here", style: .Default,
//            handler:
//            {(action: UIAlertAction!) -> Void in
//                let cell = tableView.cellForRowAtIndexPath(indexPath)
//                self.restaurantIsVisited[indexPath.row] = true
//                cell?.accessoryType = .Checkmark
//            })
//        
//        optionMenu.addAction(isVisitedAction)
//        optionMenu.addAction(callAction)
//        optionMenu.addAction(cancelAction)
//        
//        self.presentViewController(optionMenu, animated: true, completion: nil)
//        tableView.deselectRowAtIndexPath(indexPath, animated: false)
//    }
    
//  MARK - This function will generate Delete Button for you
    
//    override func tableView(tableView: UITableView, commitEditingStyle editingStyle: UITableViewCellEditingStyle, forRowAtIndexPath indexPath: NSIndexPath) {
//        if editingStyle == .Delete {
//            restaurantNames.removeAtIndex(indexPath.row)
//            restaurantIsVisited.removeAtIndex(indexPath.row)
//            restaurantImages.removeAtIndex(indexPath.row)
//        }
//        
//        tableView.deleteRowsAtIndexPaths([indexPath], withRowAnimation: .Fade)
//    }
    
    override func tableView(tableView: UITableView, editActionsForRowAtIndexPath indexPath: NSIndexPath) -> [UITableViewRowAction]? {
        
        let shareAction = UITableViewRowAction(style: .Default, title: "Share", handler: {
            (action, indexPath) -> Void in
                let defaultText = "Just checking in at " + self.restaurants[indexPath.row].name
                let activityController = UIActivityViewController(activityItems: [defaultText], applicationActivities: nil)
                self.presentViewController(activityController, animated: true, completion: nil)
            })
        
        let deleteAction = UITableViewRowAction(style: .Default, title: "Delete",
            handler: {
                (action, indexPath) -> Void in
//                self.restaurants.removeAtIndex(indexPath.row)
//                tableView.deleteRowsAtIndexPaths([indexPath], withRowAnimation:.Fade)
                if let managedObjectContext = (UIApplication.sharedApplication().delegate as? AppDelegate)?.managedObjectContext {
                    let restaurantToDelete = self.fetchResultController.objectAtIndexPath(indexPath) as! Restaurant
                    managedObjectContext.deleteObject(restaurantToDelete)
                    do {
                        try managedObjectContext.save()
                    } catch {
                        print(error)
                    }
                }
            })
        
        shareAction.backgroundColor = UIColor(red: 28.0/255.0, green: 165.0/255.0, blue: 253.0/255.0, alpha: 1.0)
        deleteAction.backgroundColor = UIColor(red: 202.0/255.0, green: 202.0/255.0, blue: 203.0/255.0, alpha: 1.0)
        
        return [deleteAction, shareAction]
    }
    
    // Override the segue function
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "showRestaurantDetail" {
            if let indexPath = tableView.indexPathForSelectedRow {
                let destinationController = segue.destinationViewController as! RestaurantDetailViewController
                destinationController.restaurant = (searchController.active) ? searchResults[indexPath.row] : restaurants[indexPath.row]
                destinationController.hidesBottomBarWhenPushed = true
            }
        }
        
    }
    
    // MARK- When there is any content change, the following methods of theNSFetchedResultsControllerDelegate protocol will be called
    
    func controllerWillChangeContent(controller: NSFetchedResultsController) {
        self.tableView.beginUpdates()
    }
    
    func controller(controller: NSFetchedResultsController, didChangeObject anObject: AnyObject, atIndexPath indexPath: NSIndexPath?, forChangeType type: NSFetchedResultsChangeType, newIndexPath: NSIndexPath?) {
        
        switch type {
        case .Insert:
            if let _newIndexPath = newIndexPath {
                self.tableView.insertRowsAtIndexPaths([_newIndexPath], withRowAnimation: .Fade)
            }
        case .Delete:
            if let _indexPath = indexPath {
                self.tableView.deleteRowsAtIndexPaths([_indexPath], withRowAnimation: .Fade)
            }
        case .Update:
            if let _indexPath = indexPath {
                self.tableView.reloadRowsAtIndexPaths([_indexPath], withRowAnimation: .Fade)
            }
            
        default:
            self.tableView.reloadData()
        }
        
        restaurants = controller.fetchedObjects as! [Restaurant]
    }
    
    func controllerDidChangeContent(controller: NSFetchedResultsController) {
        self.tableView.endUpdates()
    }
    
    // MARK - For Searching
    func filterContentForSearchText(searchText: String) {
        searchResults = restaurants.filter(
            {(restaurant:Restaurant) -> Bool in
                let nameMatch = restaurant.name.rangeOfString(searchText, options:NSStringCompareOptions.CaseInsensitiveSearch)
                return nameMatch != nil
            })
    }
    
    func updateSearchResultsForSearchController(searchController: UISearchController) {
        if let searchText = searchController.searchBar.text {
            filterContentForSearchText(searchText)
            tableView.reloadData()
        }
    }
    
    override func tableView(tableView: UITableView, canEditRowAtIndexPath indexPath: NSIndexPath) -> Bool {
        if searchController.active {
            return false
        } else {
            return true
        }
    }
}
