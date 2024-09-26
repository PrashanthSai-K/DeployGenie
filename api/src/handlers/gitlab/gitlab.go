package gitlabHandler

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/xanzy/go-gitlab"
)

	


func GetUsers(c *fiber.Ctx) error {

	gitlabURL := "http://10.10.237.159"
    privateToken := ""

    // Create a new GitLab client
    git, err := gitlab.NewOAuthClient(privateToken, gitlab.WithBaseURL(gitlabURL))

    if err != nil {
        fmt.Println("Failed to create GitLab client: %v", err)
    }

	options:= &gitlab.ListUsersOptions{
		Active: gitlab.Bool(true),
	}



	users, res, err := git.Users.ListUsers(options)


    if err != nil {
        fmt.Println("Failed to create GitLab client: %v", err)
    }


	fmt.Println(res.Body)

	for _, user := range users {
		fmt.Println(user.Name)
	}

	return c.JSON(fiber.Map{"data":users})
} 


func CreateProject(c *fiber.Ctx) error {

	gitlabURL := "http://10.10.237.159"
    privateToken := "glpat-bAN8gq6WTNZzKm3xgDCR"

    // Create a new GitLab client
    git, err := gitlab.NewOAuthClient(privateToken, gitlab.WithBaseURL(gitlabURL))

    if err != nil {
        fmt.Println("Failed to create GitLab client: %v", err)
    }
	

	  // Create a new project
	  project, _, err := git.Projects.CreateProject(&gitlab.CreateProjectOptions{
        Name:        gitlab.String("My New Project"),
        Visibility:  gitlab.Visibility(gitlab.PublicVisibility), // or PrivateVisibility
    })
    if err != nil {
        log.Fatalf("Failed to create project: %v", err)
    }
    fmt.Printf("Created project: %s (ID: %d)\n", project.Name, project.ID)

    // User IDs to assign
    // maintainerID := 1 // Replace with actual maintainer user ID
    maintainerID := 8       // Replace with actual developer user ID
    dev2ID := 7       // Replace with actual developer user ID

    // Assign users to the project
    _, _, err = git.ProjectMembers.AddProjectMember(project.ID, &gitlab.AddProjectMemberOptions{
        UserID:      gitlab.Int(maintainerID),
        AccessLevel: gitlab.AccessLevel(gitlab.MaintainerPermissions),
    })
    if err != nil {
        log.Fatalf("Failed to add maintainer: %v", err)
    }

    // _, _, err = git.ProjectMembers.AddProjectMember(project.ID, &gitlab.AddProjectMemberOptions{
    //     UserID:      gitlab.Int(dev1ID),
    //     AccessLevel: gitlab.AccessLevel(gitlab.DeveloperPermissions),
    // })
    // if err != nil {
    //     log.Fatalf("Failed to add developer 1: %v", err)
    // }

    _, _, err = git.ProjectMembers.AddProjectMember(project.ID, &gitlab.AddProjectMemberOptions{
        UserID:      gitlab.Int(dev2ID),
        AccessLevel: gitlab.AccessLevel(gitlab.DeveloperPermissions),
    })
    if err != nil {
        log.Fatalf("Failed to add developer 2: %v", err)
    }

    fmt.Println("Users assigned successfully.")




	return c.JSON(fiber.Map{
		"data":"data",
	})
}