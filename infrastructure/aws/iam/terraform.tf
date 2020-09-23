data "aws_iam_policy_document" "terraform" {
  statement {
    effect = "Allow"
    actions = [
      "iam:*",
      "organizations:DescribeAccount",
      "organizations:DescribeOrganization",
      "organizations:DescribeOrganizationalUnit",
      "organizations:DescribePolicy",
      "organizations:ListChildren",
      "organizations:ListParents",
      "organizations:ListPoliciesForTarget",
      "organizations:ListRoots",
      "organizations:ListPolicies",
      "organizations:ListTargetsForPolicy",
    ]
    resources = ["*"]
  }
}

resource "aws_iam_group_policy" "terraform" {
  name   = "terraform-${var.environment}"
  group  = aws_iam_group.terraform.id
  policy = data.aws_iam_policy_document.terraform.json
}

resource "aws_iam_group" "terraform" {
  name = "terraform-${var.environment}"
  path = "/terraform/${var.environment}/"
}

resource "aws_iam_user_group_membership" "terraform" {
  user = aws_iam_user.terraform.name
  groups = [
    aws_iam_group.terraform.name
  ]
}

resource "aws_iam_user" "terraform" {
  name = "terraform-${var.environment}"
}
