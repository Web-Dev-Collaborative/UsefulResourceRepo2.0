import UIKit
import CoreData

class AddRestaurantController: UITableViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
    @IBOutlet var imageView:UIImageView!
    @IBOutlet var nameTextField:UITextField!
    @IBOutlet var typeTextField:UITextField!
    @IBOutlet var locationTextField:UITextField!
    @IBOutlet var yesButton:UIButton!
    @IBOutlet var noButton:UIButton!
    
    var restaurant: Restaurant!
    var isVisited = true
    
    override func viewDidLoad() {
        super.viewDidLoad()

    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }

    override func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
        if indexPath.row == 0 {
            if UIImagePickerController.isSourceTypeAvailable(.PhotoLibrary) {
                let imagePicker = UIImagePickerController()
                imagePicker.delegate = self
                imagePicker.allowsEditing = false
                imagePicker.sourceType = .PhotoLibrary
                self.presentViewController(imagePicker, animated: true, completion: nil)
            }
        }
        tableView.deselectRowAtIndexPath(indexPath, animated: true)
    }
    
    func imagePickerController(picker: UIImagePickerController,didFinishPickingMediaWithInfo info: [String : AnyObject]) {
        imageView.image = info[UIImagePickerControllerOriginalImage] as? UIImage
        imageView.contentMode = UIViewContentMode.ScaleAspectFill
        imageView.clipsToBounds = true
        
        // MARK - constraint programmatically
        let leadingConstraint = NSLayoutConstraint(item: imageView, attribute:NSLayoutAttribute.Leading, relatedBy: NSLayoutRelation.Equal, toItem:imageView.superview, attribute: NSLayoutAttribute.Leading, multiplier: 1,constant: 0)
        leadingConstraint.active = true
        
        let trailingConstraint = NSLayoutConstraint(item: imageView, attribute:NSLayoutAttribute.Trailing, relatedBy: NSLayoutRelation.Equal, toItem:imageView.superview, attribute: NSLayoutAttribute.Trailing, multiplier: 1,constant: 0)
        trailingConstraint.active = true
        
        let topConstraint = NSLayoutConstraint(item: imageView, attribute:NSLayoutAttribute.Top, relatedBy: NSLayoutRelation.Equal, toItem:
        imageView.superview, attribute: NSLayoutAttribute.Top, multiplier: 1, constant:0)
        topConstraint.active = true
        
        let bottomConstraint = NSLayoutConstraint(item: imageView, attribute:NSLayoutAttribute.Bottom, relatedBy: NSLayoutRelation.Equal, toItem:imageView.superview, attribute: NSLayoutAttribute.Bottom, multiplier: 1,constant: 0)
        bottomConstraint.active = true
        
        // MARK - Close the ImagePicker View.
        dismissViewControllerAnimated(true, completion: nil)
    }
    
    @IBAction func saveRestaurant(sender: UIButton) {
        print(nameTextField.text)
        print(locationTextField.text)
        print(typeTextField.text)
        print("Have you ever been there? \(isVisited)")
        
        let name = nameTextField.text
        let type = typeTextField.text
        let location = locationTextField.text
        
        // CoreData things
        if let managedObjectContext = (UIApplication.sharedApplication().delegate as? AppDelegate)?.managedObjectContext {
            restaurant = NSEntityDescription.insertNewObjectForEntityForName("Restaurant", inManagedObjectContext: managedObjectContext) as! Restaurant
            restaurant.name = name!
            restaurant.type = type!
            restaurant.location = location!
            if let restaurantImage = imageView.image {
                restaurant.image = UIImagePNGRepresentation(restaurantImage)
            }
            restaurant.isVisited = isVisited
            do {
                try managedObjectContext.save()
            } catch {
                print(error)
                return
            }
        }
        
        dismissViewControllerAnimated(true, completion: nil)
    }
    
    @IBAction func toggleYesNoButton(sender: UIButton) {
        if sender == yesButton {
            isVisited = true
            yesButton.backgroundColor = UIColor.redColor()
            noButton.backgroundColor = UIColor.grayColor()
        } else if sender == noButton {
            isVisited = false
            noButton.backgroundColor = UIColor.redColor()
            yesButton.backgroundColor = UIColor.grayColor()
        }
    }
}
